from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import relationship

from fastapi_app.core.database import Base


class Pathway(Base):
    __tablename__ = "pathways"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"), nullable=False, index=True)
    title = Column(String(150), nullable=False)
    description = Column(Text, nullable=True)
    pathway_type = Column(String(50), nullable=False, default="career")
    status = Column(String(20), nullable=False, default="active")
    recommendation_summary = Column(Text, nullable=True)
    created_at = Column(DateTime, nullable=False, server_default=func.now())
    updated_at = Column(DateTime, nullable=False, server_default=func.now(), onupdate=func.now())

    student = relationship("Student")
    steps = relationship("PathwayStep", back_populates="pathway", cascade="all, delete-orphan")
    subjects = relationship("PathwaySubject", back_populates="pathway", cascade="all, delete-orphan")
    institutions = relationship("PathwayInstitution", back_populates="pathway", cascade="all, delete-orphan")
    resources = relationship("PathwayResource", back_populates="pathway", cascade="all, delete-orphan")


class PathwayStep(Base):
    __tablename__ = "pathway_steps"

    id = Column(Integer, primary_key=True, index=True)
    pathway_id = Column(Integer, ForeignKey("pathways.id"), nullable=False, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    step_order = Column(Integer, nullable=False, default=1)
    completed = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime, nullable=False, server_default=func.now())

    pathway = relationship("Pathway", back_populates="steps")


class PathwaySubject(Base):
    __tablename__ = "pathway_subjects"

    id = Column(Integer, primary_key=True, index=True)
    pathway_id = Column(Integer, ForeignKey("pathways.id"), nullable=False, index=True)
    subject_id = Column(Integer, nullable=False, index=True)

    pathway = relationship("Pathway", back_populates="subjects")


class PathwayInstitution(Base):
    __tablename__ = "pathway_institutions"

    id = Column(Integer, primary_key=True, index=True)
    pathway_id = Column(Integer, ForeignKey("pathways.id"), nullable=False, index=True)
    institution_id = Column(Integer, nullable=False, index=True)

    pathway = relationship("Pathway", back_populates="institutions")


class PathwayResource(Base):
    __tablename__ = "pathway_resources"

    id = Column(Integer, primary_key=True, index=True)
    pathway_id = Column(Integer, ForeignKey("pathways.id"), nullable=False, index=True)
    resource_id = Column(Integer, nullable=False, index=True)

    pathway = relationship("Pathway", back_populates="resources")
