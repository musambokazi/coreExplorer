from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Institution(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    province = db.Column(db.String(50), nullable=False)
    institution_type = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(100), nullable=True)
    description = db.Column(db.Text, nullable=True)
    website = db.Column(db.String(300), nullable=True)
    subjects = db.relationship("InstitutionSubject", back_populates="institution", cascade="all, delete-orphan")


class Quiz(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question_text = db.Column(db.String(255), nullable=False)
    associated_value = db.Column(db.String(100), nullable=False)


class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)


class QuizResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey("student.id"), nullable=False)
    path = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    careers = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())


class Subject(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=False)
    value_tag = db.Column(db.String(50), nullable=False)


class Resource(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    resource_type = db.Column(db.String(50), nullable=False)
    url = db.Column(db.String(300), nullable=False)
    value_tag = db.Column(db.String(50), nullable=False)


class InstitutionSubject(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    institution_id = db.Column(db.Integer, db.ForeignKey("institution.id"), nullable=False)
    subject_name = db.Column(db.String(150), nullable=False)
    subject_description = db.Column(db.Text, nullable=True)
    institution = db.relationship("Institution", back_populates="subjects")
