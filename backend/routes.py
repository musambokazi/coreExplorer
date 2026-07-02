from flask import jsonify
from models import Institution, Quiz

def register_routes(app):
    @app.route("/api/questions", methods=["GET"])
    def get_questions():
        questions = QuizQuestion.query.all()
        return jsonify([{"id": q.id, "text": q.question_text, "value": q.associated_value} for q in questions])
    @app.route("/api/institutions", methods=["GET"])
    def get_institutions():
        schools = Institution.query.all()
        return jsonify([{"id": s.id, "name": s.name, "province": s.province, "type": s.institution_type} for s in schools])