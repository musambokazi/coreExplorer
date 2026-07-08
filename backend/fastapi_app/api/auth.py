from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi_app.core.database import get_db
from fastapi_app.models.student import Student
from fastapi_app.schemas.student import StudentCreate, StudentOut
from typing import Optional
from pydantic import BaseModel

router = APIRouter(prefix="/api/auth", tags=["auth"])

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/register", response_model=StudentOut, status_code=status.HTTP_201_CREATED)
def register(payload: StudentCreate, db: Session = Depends(get_db)):
    # Check if student exists
    existing = db.query(Student).filter(Student.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="A student with this email already exists.")
    
    # We should hash in production, but match backend/blueprints/main.py logic or store simple password hash
    # For now we'll store password directly as password_hash or simple string
    db_student = Student(
        name=payload.name,
        email=payload.email,
        password_hash=payload.password, # Plain text or dummy hash for now, matching simple login verification
        is_premium=False
    )
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

@router.post("/login", response_model=StudentOut)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.email == payload.email).first()
    if not student or student.password_hash != payload.password:
        raise HTTPException(status_code=401, detail="Invalid email or password.")
    return student

@router.post("/subscribe", response_model=StudentOut)
def subscribe(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    student.is_premium = True
    db.commit()
    db.refresh(student)
    return student
