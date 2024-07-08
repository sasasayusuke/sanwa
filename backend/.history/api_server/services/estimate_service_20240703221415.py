from api_server.repositories.estimate_repository import EstimateRepository
from api_server.models.estimate import Estimate
from api_server.schemas.estimate import EstimateCreate, EstimateUpdate
from typing import List, Optional

class EstimateService:
    def __init__(self, repository: EstimateRepository):
        self.repository = repository

    def create_estimate(self, estimate: EstimateCreate):
        db_estimate = Estimate(**estimate.dict())
        return self.repository.create(db_estimate)

    def get_estimate(self, estimate_id: int):
        return self.repository.get_by_id(estimate_id)

    def get_estimates(self, skip: int = 0, limit: int = 100):
        return self.repository.get_all(skip, limit)

    def update_estimate(self, estimate_id: int, estimate: EstimateUpdate):
        db_estimate = self.repository.get_by_id(estimate_id)
        if db_estimate:
            update_data = estimate.dict(exclude_unset=True)
            for key, value in update_data.items():
                setattr(db_estimate, key, value)
            return self.repository.update(db_estimate)
        return None

    def delete_estimate(self, estimate_id: int):
        return self.repository.delete(estimate_id)