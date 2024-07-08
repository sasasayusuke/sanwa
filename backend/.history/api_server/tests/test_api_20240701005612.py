from fastapi.testclient import TestClient
from src.api_server.main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}

def test_python_312_feature():
    response = client.get("/python312")
    assert response.status_code == 200
    assert "banana is in the list" in response.json()["result"]