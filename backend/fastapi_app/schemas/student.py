from pydantic import BaseModel, EmailStr
from typing import Optional


class StudentCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class StudentOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    is_active: bool
    is_premium: bool = False
    bio: Optional[str] = None

    class Config:
        from_attributes = True
