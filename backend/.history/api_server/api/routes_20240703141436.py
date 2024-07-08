# api/routes.py
from fastapi import APIRouter, Depends
from api_server.services.estimate_service import EstimateService
from ..models.estimate import Estimate
from typing import List

router = APIRouter()

@router.get("/estimate", response_model=List[Estimate])
async def get_users(estimate_service: EstimateService = Depends()):
    return estimate_service.get_estimate()