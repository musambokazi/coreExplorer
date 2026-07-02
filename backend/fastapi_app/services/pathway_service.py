from sqlalchemy.orm import Session

from fastapi_app.models.pathway import Pathway, PathwayStep
from fastapi_app.schemas.pathway import PathwayCreate, PathwayStepCreate


class PathwayService:
    def __init__(self, db: Session):
        self.db = db

    def create_pathway(self, payload: PathwayCreate) -> Pathway:
        pathway = Pathway(**payload.model_dump())
        self.db.add(pathway)
        self.db.commit()
        self.db.refresh(pathway)
        return pathway

    def list_pathways(self, student_id: int) -> list[Pathway]:
        return self.db.query(Pathway).filter(Pathway.student_id == student_id).order_by(Pathway.created_at.desc()).all()

    def get_pathway(self, pathway_id: int, student_id: int) -> Pathway | None:
        return (
            self.db.query(Pathway)
            .filter(Pathway.id == pathway_id, Pathway.student_id == student_id)
            .first()
        )

    def add_step(self, pathway_id: int, payload: PathwayStepCreate) -> PathwayStep:
        step = PathwayStep(pathway_id=pathway_id, **payload.model_dump())
        self.db.add(step)
        self.db.commit()
        self.db.refresh(step)
        return step

    def update_step(self, step_id: int, completed: bool) -> PathwayStep | None:
        step = self.db.query(PathwayStep).filter(PathwayStep.id == step_id).first()
        if not step:
            return None
        step.completed = completed
        self.db.commit()
        self.db.refresh(step)
        return step
