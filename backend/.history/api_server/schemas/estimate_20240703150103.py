from api_server.repositories.estimate_repository import EstimateRepository
from api_server.models.estimate import Estimate
from api_server.schemas.estimate import EstimateCreate, EstimateUpdate
from typing import List, Optional

class EstimateService:
    def __init__(self, repository: EstimateRepository):
        self.repository = repository

    def get_estimate(self, estimate_id: int) -> Optional[Estimate]:
        return self.repository.get_by_id(estimate_id)

    def get_estimates(self, skip: int = 0, limit: int = 100) -> List[Estimate]:
        return self.repository.get_all(skip, limit)

    def delete_estimate(self, estimate_id: int) -> bool:
        return self.repository.delete(estimate_id)