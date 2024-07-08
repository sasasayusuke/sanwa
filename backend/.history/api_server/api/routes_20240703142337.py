from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..schemas import estimate as schemas
from ..services.estimate_service import EstimateService
from ..database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.EstimateResponse)
def create_estimate(estimate: schemas.EstimateCreate, db: Session = Depends(get_db)):
    estimate_service = EstimateService(db)
    return estimate_service.create_estimate(estimate.dict())

@router.get("/{estimate_id}", response_model=schemas.EstimateResponse)
def read_estimate(estimate_id: int, db: Session = Depends(get_db)):
    estimate_service = EstimateService(db)
    estimate = estimate_service.get_estimate(estimate_id)
    if estimate is None:
        raise HTTPException(status_code=404, detail="Estimate not found")
    return estimate

@router.get("/", response_model=schemas.EstimateList)
def list_estimates(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    estimate_service = EstimateService(db)
    estimates = estimate_service.list_estimates(skip, limit)
    return {"items": estimates, "total": len(estimates)}

@router.put("/{estimate_id}", response_model=schemas.EstimateResponse)
def update_estimate(estimate_id: int, estimate: schemas.EstimateUpdate, db: Session = Depends(get_db)):
    estimate_service = EstimateService(db)
    updated_estimate = estimate_service.update_estimate(estimate_id, estimate.dict(exclude_unset=True))
    if updated_estimate is None:
        raise HTTPException(status_code=404, detail="Estimate not found")
    return updated_estimate

@router.delete("/{estimate_id}", response_model=bool)
def delete_estimate(estimate_id: int, db: Session = Depends(get_db)):
    estimate_service = EstimateService(db)
    result = estimate_service.delete_estimate(estimate_id)
    if not result:
        raise HTTPException(status_code=404, detail="Estimate not found")
    return result