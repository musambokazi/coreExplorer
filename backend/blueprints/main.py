from flask import Blueprint, jsonify, current_app, request
from services import InstitutionService, QuizService
from models import Student, QuizResult, Subject, Resource, Institution, InstitutionSubject, db
from werkzeug.security import generate_password_hash, check_password_hash

main_bp = Blueprint("main", __name__)


@main_bp.route("/api/institutions", methods=["GET"])
def get_institutions():
    try:
        institution_type = (request.args.get("type") or "").strip().lower()
        province = (request.args.get("province") or "").strip()
        search = (request.args.get("search") or "").strip()

        query = Institution.query
        if institution_type:
            query = query.filter(Institution.institution_type.ilike(f"%{institution_type}%"))
        if province:
            query = query.filter(Institution.province.ilike(f"%{province}%"))
        if search:
            query = query.filter(Institution.name.ilike(f"%{search}%"))

        institutions = query.order_by(Institution.name).all()
        return jsonify(
            [
                {
                    "id": school.id,
                    "name": school.name,
                    "province": school.province,
                    "type": school.institution_type,
                    "city": school.city,
                    "description": school.description,
                    "website": school.website,
                    "subjects": [
                        {
                            "name": mapping.subject_name,
                            "description": mapping.subject_description,
                        }
                        for mapping in school.subjects
                    ],
                }
                for school in institutions
            ]
        )
    except Exception:
        current_app.logger.exception("Failed to fetch institutions")
        return jsonify({"error": "Unable to load institutions."}), 500


@main_bp.route("/api/questions", methods=["GET"])
def get_questions():
    try:
        questions = QuizService.get_all()
        return jsonify(
            [
                {
                    "id": question.id,
                    "text": question.question_text,
                    "value": question.associated_value,
                }
                for question in questions
            ]
        )
    except Exception:
        current_app.logger.exception("Failed to fetch questions")
        return jsonify({"error": "Unable to load quiz questions."}), 500


@main_bp.route("/api/auth/register", methods=["POST"])
def register_student():
    payload = request.get_json(silent=True) or {}
    name = (payload.get("name") or "").strip()
    email = (payload.get("email") or "").strip().lower()
    password = (payload.get("password") or "").strip()

    if not name or not email or not password:
        return jsonify({"error": "Name, email, and password are required."}), 400

    if Student.query.filter_by(email=email).first():
        return jsonify({"error": "A student with this email already exists."}), 400

    student = Student(name=name, email=email, password_hash=generate_password_hash(password))
    db.session.add(student)
    db.session.commit()

    return jsonify({"message": "Student registered successfully.", "student": {"id": student.id, "name": student.name, "email": student.email}}), 201


@main_bp.route("/api/auth/login", methods=["POST"])
def login_student():
    payload = request.get_json(silent=True) or {}
    email = (payload.get("email") or "").strip().lower()
    password = (payload.get("password") or "").strip()

    student = Student.query.filter_by(email=email).first()
    if not student or not check_password_hash(student.password_hash, password):
        return jsonify({"error": "Invalid email or password."}), 401

    return jsonify({"message": "Login successful.", "student": {"id": student.id, "name": student.name, "email": student.email}})


@main_bp.route("/api/results", methods=["POST"])
def save_result():
    payload = request.get_json(silent=True) or {}
    student_id = payload.get("student_id")
    path = (payload.get("path") or "").strip()
    description = (payload.get("description") or "").strip()
    careers = ",".join(payload.get("careers") or [])

    if not student_id or not path or not description:
        return jsonify({"error": "Student id, path, and description are required."}), 400

    result = QuizResult(student_id=student_id, path=path, description=description, careers=careers)
    db.session.add(result)
    db.session.commit()

    return jsonify({"message": "Result saved successfully."}), 201


@main_bp.route("/api/results/<int:student_id>", methods=["GET"])
def get_results(student_id):
    results = QuizResult.query.filter_by(student_id=student_id).order_by(QuizResult.created_at.desc()).all()
    return jsonify(
        [
            {
                "id": result.id,
                "path": result.path,
                "description": result.description,
                "careers": result.careers.split(",") if result.careers else [],
                "created_at": result.created_at.isoformat(),
            }
            for result in results
        ]
    )


@main_bp.route("/api/subjects", methods=["GET"])
def get_subjects():
    path = (request.args.get("path") or "").strip().lower()
    query = Subject.query
    if path:
        query = query.filter(Subject.value_tag == path)
    subjects = query.all()
    return jsonify(
        [
            {
                "id": subject.id,
                "name": subject.name,
                "description": subject.description,
                "value_tag": subject.value_tag,
            }
            for subject in subjects
        ]
    )


@main_bp.route("/api/resources", methods=["GET"])
def get_resources():
    path = (request.args.get("path") or "").strip().lower()
    query = Resource.query
    if path:
        query = query.filter(Resource.value_tag == path)
    resources = query.all()
    return jsonify(
        [
            {
                "id": resource.id,
                "title": resource.title,
                "description": resource.description,
                "resource_type": resource.resource_type,
                "url": resource.url,
                "value_tag": resource.value_tag,
            }
            for resource in resources
        ]
    )
