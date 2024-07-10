
# test_services.py
import pytest
from api_server.services.estimate_service import EstimateService
from api_server.schemas.estimate_schema import EstimateCreate

@pytest.fixture
def estimate_repository():
    # モックのリポジトリを作成
    class MockRepository:
        def create(self, estimate):
            return estimate
    return MockRepository()

def test_create_estimate(estimate_repository):
    service = EstimateService(estimate_repository)
    estimate_data = EstimateCreate(estimate_number=1, estimate_title="Test", customer_code="0001", total_amount=1000.00)
    created_estimate = service.create_estimate(estimate_data)
    assert created_estimate.estimate_number == 1
    assert created_estimate.estimate_title == "Test"