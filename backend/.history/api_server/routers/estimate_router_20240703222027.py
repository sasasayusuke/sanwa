from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from api_server.schemas.estimate import EstimateCreate, EstimateUpdate, Estimate
from api_server.services.estimate_service import EstimateService
from api_server.repositories.estimate_repository import EstimateRepository
from api_server.database import get_db

router = APIRouter()

def get_estimate_service(db: Session = Depends(get_db)):
    repository = EstimateRepository(db)
    return EstimateService(repository)

@router.post("/estimates/", response_model=Estimate)
def create_estimate(estimate: EstimateCreate, service: EstimateService = Depends(get_estimate_service)):
    return service.create_estimate(estimate)

@router.get("/estimates/{estimate_id}", response_model=Estimate)
def read_estimate(estimate_id: int, service: EstimateService = Depends(get_estimate_service)):
    estimate = service.get_estimate(estimate_id)
    if estimate is None:
        raise HTTPException(status_code=404, detail="Estimate not found")
    return estimate

@router.get("/estimates/", response_model=List[Estimate])
def list_estimates(skip: int = 0, limit: int = 100, service: EstimateService = Depends(get_estimate_service)):
    return service.get_estimates(skip, limit)

@router.put("/estimates/{estimate_id}", response_model=Estimate)
def update_estimate(estimate_id: int, estimate: EstimateUpdate, service: EstimateService = Depends(get_estimate_service)):
    updated_estimate = service.update_estimate(estimate_id, estimate)
    if updated_estimate is None:
        raise HTTPException(status_code=404, detail="Estimate not found")
    return updated_estimate

@router.delete("/estimates/{estimate_id}", response_model=bool)
def delete_estimate(estimate_id: int, service: EstimateService = Depends(get_estimate_service)):
    result = service.delete_estimate(estimate_id)
    if not result:
        raise HTTPException(status_code=404, detail="Estimate not found")
    return result