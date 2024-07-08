from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class EstimateBase(BaseModel):
    estimate_number: int
    estimate_title: str
    customer_code: str
    total_amount: float

class EstimateCreate(EstimateBase):
    pass

class EstimateUpdate(BaseModel):
    estimate_title: Optional[str] = None
    customer_code: Optional[str] = None
    total_amount: Optional[float] = None

class EstimateInDBBase(EstimateBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class Estimate(EstimateInDBBase):
    pass

class EstimateInDB(EstimateInDBBase):
    pass