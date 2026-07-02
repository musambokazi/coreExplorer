from fastapi import FastAPI
from fastapi_app.api.pathways import router as pathways_router
from fastapi_app.core.database import Base, engine
from fastapi_app.models.student import Student
from fastapi_app.models.pathway import Pathway, PathwayStep, PathwaySubject, PathwayInstitution, PathwayResource

app = FastAPI(title="CoreExplore API")

Base.metadata.create_all(bind=engine)

app.include_router(pathways_router)


@app.get("/health")
def health_check():
    return {"status": "ok"}
