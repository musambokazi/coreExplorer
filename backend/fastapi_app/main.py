from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_app.api.pathways import router as pathways_router
from fastapi_app.core.database import Base, engine
from fastapi_app.models.student import Student
from fastapi_app.models.pathway import Pathway, PathwayStep, PathwaySubject, PathwayInstitution, PathwayResource

app = FastAPI(title="CoreExplore API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

from fastapi_app.api.auth import router as auth_router

app.include_router(pathways_router)
app.include_router(auth_router)


@app.get("/health")
def health_check():
    return {"status": "ok"}
