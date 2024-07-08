from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from models.estimate import Estimate
from repositories.estimate_repository import EstimateRepository

class EstimateService:
    def __init__(self, db: Session):
        self.repository = EstimateRepository(db)

    def create_estimate(self, estimate_data: dict):
        # ビジネスロジックやバリデーションをここに追加
        if not estimate_data.get('estimate_title'):
            raise ValueError("Estimate title is required")

        new_estimate = Estimate(**estimate_data)
        return self.repository.create(new_estimate)

    def get_estimate(self, estimate_number: int)[Estimate]:
        return self.repository.get_by_id(estimate_number)

    def list_estimates(self, skip: int = 0, limit: int = 100)[Estimate]:
        return self.repository.list(skip, limit)

    def update_estimate(self, estimate_number: int, estimate_data: dict)[Estimate]:
        existing_estimate = self.repository.get_by_id(estimate_number)
        if not existing_estimate:
            return None

        # 更新可能なフィールドを指定
        updatable_fields = ['estimate_title', 'customer_code', 'total_amount', 'remarks']
        for field in updatable_fields:
            if field in estimate_data:
                setattr(existing_estimate, field, estimate_data[field])

        return self.repository.update(existing_estimate)

    def delete_estimate(self, estimate_number: int):
        return self.repository.delete(estimate_number)

    def get_customer_estimates(self, customer_code: str, skip: int = 0, limit: int = 100)[Estimate]:
        return self.repository.get_by_customer_code(customer_code, skip, limit)

    def get_estimates_by_date_range(self, start_date: datetime, end_date: datetime, skip: int = 0, limit: int = 100)[Estimate]:
        return self.repository.get_by_date_range(start_date, end_date, skip, limit)

    def calculate_total_amount_for_customer(self, customer_code: str):
        estimates = self.repository.get_by_customer_code(customer_code)
        return sum(estimate.total_amount for estimate in estimates)

    def mark_estimate_as_ordered(self, estimate_number: int)[Estimate]:
        estimate = self.repository.get_by_id(estimate_number)
        if not estimate:
            return None

        estimate.order_date = datetime.now()
        estimate.order_category = 1  # Assuming 1 represents "ordered"
        return self.repository.update(estimate)

    def validate_estimate(self, estimate: Estimate):
        # ビジネスルールに基づくバリデーションロジック
        if estimate.total_amount <= 0:
            return False
        if not estimate.customer_code or not estimate.estimate_title:
            return False
        # その他のバリデーションルール...
        return True