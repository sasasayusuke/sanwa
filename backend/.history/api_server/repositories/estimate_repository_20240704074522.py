from sqlalchemy.orm import Session
from models.estimate_model import Estimate

class EstimateRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, estimate: Estimate):
        self.db.add(estimate)
        self.db.commit()
        self.db.refresh(estimate)
        return estimate

    def get_by_id(self, estimate_id: int):
        return self.db.query(Estimate).filter(Estimate.id == estimate_id).first()

    def get_all(self, skip: int = 0, limit: int = 100):
        return self.db.query(Estimate).offset(skip).limit(limit).all()

    def update(self, estimate: Estimate):
        self.db.commit()
        self.db.refresh(estimate)
        return estimate

    def delete(self, estimate_id: int):
        estimate = self.get_by_id(estimate_id)
        if estimate:
            self.db.delete(estimate)
            self.db.commit()
            return True
        return False