from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from fastapi_app.core.database import get_db
from fastapi_app.schemas.pathway import PathwayCreate, PathwayOut, PathwayStepCreate, PathwayStepOut
from fastapi_app.services.pathway_service import PathwayService

router = APIRouter(prefix="/api/pathways", tags=["pathways"])


@router.post("", response_model=PathwayOut, status_code=status.HTTP_201_CREATED)
def create_pathway(payload: PathwayCreate, db: Session = Depends(get_db)):
    service = PathwayService(db)
    return service.create_pathway(payload)


@router.get("", response_model=list[PathwayOut])
def list_pathways(student_id: int, db: Session = Depends(get_db)):
    service = PathwayService(db)
    return service.list_pathways(student_id)


@router.get("/{pathway_id}", response_model=PathwayOut)
def get_pathway(pathway_id: int, student_id: int, db: Session = Depends(get_db)):
    service = PathwayService(db)
    pathway = service.get_pathway(pathway_id, student_id)
    if not pathway:
        raise HTTPException(status_code=404, detail="Pathway not found")
    return pathway


@router.post("/{pathway_id}/steps", response_model=PathwayStepOut, status_code=status.HTTP_201_CREATED)
def add_step(pathway_id: int, payload: PathwayStepCreate, db: Session = Depends(get_db)):
    service = PathwayService(db)
    return service.add_step(pathway_id, payload)


@router.patch("/{pathway_id}/steps/{step_id}", response_model=PathwayStepOut)
def update_step(pathway_id: int, step_id: int, completed: bool, db: Session = Depends(get_db)):
    service = PathwayService(db)
    step = service.update_step(step_id, completed)
    if not step:
        raise HTTPException(status_code=404, detail="Step not found")
    return step
