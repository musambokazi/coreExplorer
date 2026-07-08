from sqlalchemy import Boolean, Column, Integer, String, Text, DateTime, func
from fastapi_app.core.database import Base


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    email = Column(String(150), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    is_premium = Column(Boolean, default=False)
    created_at = Column(DateTime, nullable=False, server_default=func.now())
    bio = Column(Text, nullable=True)
