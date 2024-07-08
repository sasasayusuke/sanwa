from fastapi import APIRouter
from api_server.routers.estimate_router import router

router = APIRouter()

router.include_router(estimates_router, prefix="/estimates", tags=["estimates"])