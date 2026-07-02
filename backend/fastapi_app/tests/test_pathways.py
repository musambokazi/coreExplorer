from fastapi.testclient import TestClient

from fastapi_app.main import app

client = TestClient(app)


def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_create_and_list_pathway():
    payload = {
        "student_id": 1,
        "title": "STEM Pathway",
        "description": "A sample pathway",
        "pathway_type": "career",
        "status": "active",
    }
    create_response = client.post("/api/pathways", json=payload)
    assert create_response.status_code == 201
    created = create_response.json()
    assert created["title"] == payload["title"]

    list_response = client.get("/api/pathways", params={"student_id": 1})
    assert list_response.status_code == 200
    assert isinstance(list_response.json(), list)
