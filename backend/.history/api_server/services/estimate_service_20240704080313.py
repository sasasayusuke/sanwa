from repositories.estimate_repository import EstimateRepository
from models.estimate_model import Estimate
from schemas.estimate_schema import EstimateCreate, EstimateUpdate

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