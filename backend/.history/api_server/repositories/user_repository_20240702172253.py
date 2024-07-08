from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List, Optional
from datetime import datetime
from models.Estimate import Estimate

class EstimateRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, estimate: Estimate) -> Estimate:
        self.db.add(estimate)
        self.db.commit()
        self.db.refresh(estimate)
        return estimate

    def get_by_id(self, estimate_number: int) -> Optional[Estimate]:
        return self.db.query(Estimate).filter(Estimate.estimate_number == estimate_number).first()

    def list(self, skip: int = 0, limit: int = 100) -> List[Estimate]:
        return self.db.query(Estimate).order_by(desc(Estimate.estimate_date)).offset(skip).limit(limit).all()

    def update(self, estimate: Estimate) -> Estimate:
        self.db.commit()
        self.db.refresh(estimate)
        return estimate

    def delete(self, estimate_number: int) -> bool:
        estimate = self.get_by_id(estimate_number)
        if estimate:
            self.db.delete(estimate)
            self.db.commit()
            return True
        return False

    def get_by_customer_code(self, customer_code: str, skip: int = 0, limit: int = 100) -> List[Estimate]:
        return self.db.query(Estimate).filter(Estimate.customer_code == customer_code)\
            .order_by(desc(Estimate.estimate_date)).offset(skip).limit(limit).all()

    def get_by_date_range(self, start_date: datetime, end_date: datetime, skip: int = 0, limit: int = 100) -> List[Estimate]:
        return self.db.query(Estimate).filter(Estimate.estimate_date.between(start_date, end_date))\
            .order_by(desc(Estimate.estimate_date)).offset(skip).limit(limit).all()