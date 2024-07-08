# api/routes.py
from fastapi import APIRouter, Depends
from services.user_service import UserService
from ..models.TM科目摘要 import User
from typing import List

router = APIRouter()

@router.get("/users", response_model=List[User])
async def get_users(user_service: UserService = Depends()):
    return await user_service.get_users()