
# test_routers.py
from fastapi.testclient import TestClient
from api_server.main import app

client = TestClient(app)

def test_create_estimate():
    response = client.post(
        "/estimates/",
        json={"estimate_number": 1, "estimate_title": "Test", "customer_code": "0001", "total_amount": 1000.00}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["estimate_number"] == 1
    assert data["estimate_title"] == "Test"