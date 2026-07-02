from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, ConfigDict


class PathwayStepBase(BaseModel):
    title: str
    description: Optional[str] = None
    step_order: int = 1
    completed: bool = False


class PathwayStepCreate(PathwayStepBase):
    pass


class PathwayStepOut(PathwayStepBase):
    id: int
    pathway_id: int

    model_config = ConfigDict(from_attributes=True)


class PathwayBase(BaseModel):
    title: str
    description: Optional[str] = None
    pathway_type: str = "career"
    status: str = "active"
    recommendation_summary: Optional[str] = None


class PathwayCreate(PathwayBase):
    student_id: int


class PathwayOut(PathwayBase):
    id: int
    student_id: int
    created_at: datetime
    updated_at: datetime
    steps: List[PathwayStepOut] = []

    model_config = ConfigDict(from_attributes=True)
