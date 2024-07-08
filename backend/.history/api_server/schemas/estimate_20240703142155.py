from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class EstimateBase(BaseModel):
    estimate_title: str
    customer_code: str
    total_amount: float

class EstimateCreate(EstimateBase):
    pass

class EstimateUpdate(EstimateBase):
    estimate_title: Optional[str] = None
    customer_code: Optional[str] = None
    total_amount: Optional[float] = None

class EstimateInDB(EstimateBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class EstimateResponse(EstimateInDB):
    pass

class EstimateList(BaseModel):
    items: List[EstimateResponse]
    total: int