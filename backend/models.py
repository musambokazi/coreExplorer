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
    __tablename__ = "student"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

    pathways = db.relationship(
        "Pathway",
        back_populates="student",
        cascade="all, delete-orphan",
    )


class Pathway(db.Model):
    __tablename__ = "pathway"

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(
        db.Integer,
        db.ForeignKey("student.id"),
        nullable=False,
        index=True,
    )
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=True)
    pathway_type = db.Column(db.String(50), nullable=False, default="career")
    status = db.Column(
        db.String(20),
        nullable=False,
        default="active",
        server_default="active",
    )
    recommendation_summary = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(
        db.DateTime,
        nullable=False,
        server_default=db.func.now(),
        onupdate=db.func.now(),
    )

    student = db.relationship("Student", back_populates="pathways")
    steps = db.relationship(
        "PathwayStep",
        back_populates="pathway",
        cascade="all, delete-orphan",
    )
    subjects = db.relationship(
        "PathwaySubject",
        back_populates="pathway",
        cascade="all, delete-orphan",
    )
    institutions = db.relationship(
        "PathwayInstitution",
        back_populates="pathway",
        cascade="all, delete-orphan",
    )
    resources = db.relationship(
        "PathwayResource",
        back_populates="pathway",
        cascade="all, delete-orphan",
    )

    __table_args__ = (
        db.CheckConstraint(
            "status IN ('draft', 'active', 'completed', 'archived')",
            name="ck_pathway_status",
        ),
    )


class PathwayStep(db.Model):
    __tablename__ = "pathway_step"

    id = db.Column(db.Integer, primary_key=True)
    pathway_id = db.Column(
        db.Integer,
        db.ForeignKey("pathway.id"),
        nullable=False,
        index=True,
    )
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    step_order = db.Column(db.Integer, nullable=False, default=1)
    completed = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())

    pathway = db.relationship("Pathway", back_populates="steps")

    __table_args__ = (
        db.CheckConstraint("step_order > 0", name="ck_pathway_step_order"),
    )


class PathwaySubject(db.Model):
    __tablename__ = "pathway_subject"

    id = db.Column(db.Integer, primary_key=True)
    pathway_id = db.Column(
        db.Integer,
        db.ForeignKey("pathway.id"),
        nullable=False,
        index=True,
    )
    subject_id = db.Column(
        db.Integer,
        db.ForeignKey("subject.id"),
        nullable=False,
        index=True,
    )

    pathway = db.relationship("Pathway", back_populates="subjects")
    subject = db.relationship("Subject")

    __table_args__ = (
        db.UniqueConstraint("pathway_id", "subject_id", name="uq_pathway_subject"),
    )


class PathwayInstitution(db.Model):
    __tablename__ = "pathway_institution"

    id = db.Column(db.Integer, primary_key=True)
    pathway_id = db.Column(
        db.Integer,
        db.ForeignKey("pathway.id"),
        nullable=False,
        index=True,
    )
    institution_id = db.Column(
        db.Integer,
        db.ForeignKey("institution.id"),
        nullable=False,
        index=True,
    )

    pathway = db.relationship("Pathway", back_populates="institutions")
    institution = db.relationship("Institution")

    __table_args__ = (
        db.UniqueConstraint("pathway_id", "institution_id", name="uq_pathway_institution"),
    )


class PathwayResource(db.Model):
    __tablename__ = "pathway_resource"

    id = db.Column(db.Integer, primary_key=True)
    pathway_id = db.Column(
        db.Integer,
        db.ForeignKey("pathway.id"),
        nullable=False,
        index=True,
    )
    resource_id = db.Column(
        db.Integer,
        db.ForeignKey("resource.id"),
        nullable=False,
        index=True,
    )

    pathway = db.relationship("Pathway", back_populates="resources")
    resource = db.relationship("Resource")

    __table_args__ = (
        db.UniqueConstraint("pathway_id", "resource_id", name="uq_pathway_resource"),
    )
