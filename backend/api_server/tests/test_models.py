# test_models.py
from api_server.models.estimate_model import Estimate
from datetime import datetime

def test_estimate_model():
    estimate = Estimate(
        estimate_number=1,
        estimate_date=datetime.now(),
        staff_code=1,
        estimate_title="Test Estimate",
        customer_code="0001",
        customer_name1="Test Customer",
        customer_name2="",
        customer_tel="123-456-7890",
        customer_fax="098-765-4321",
        total_amount=1000.00,
        total_cost=800.00,
        cost_rate=80.00
    )
    assert estimate.estimate_number == 1
    assert estimate.estimate_title == "Test Estimate"
    assert estimate.customer_code == "0001"
    assert estimate.total_amount == 1000.00