
# test_repositories.py
import pytest
from api_server.repositories.estimate_repository import EstimateRepository
from api_server.models.estimate_model import Estimate

@pytest.fixture
def db_session():
    # モックのデータベースセッションを作成
    # 実際の実装では、テスト用のデータベースを使用するか、
    # モックオブジェクトを使用してデータベース操作をシミュレートします
    pass

def test_create_estimate(db_session):
    repo = EstimateRepository(db_session)
    estimate = Estimate(estimate_number=1, estimate_title="Test", customer_code="0001", total_amount=1000.00)
    created_estimate = repo.create(estimate)
    assert created_estimate.estimate_number == 1
    assert created_estimate.estimate_title == "Test"