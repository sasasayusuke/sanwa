from fastapi import APIRouter
from .estimates import router as estimates_router

router = APIRouter()

router.include_router(estimates_router, prefix="/estimates", tags=["estimates"])