from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class TM科目摘要Schema(BaseModel):
    id: int
    科目CD: int
    摘要CD: int
    摘要名: str
    初期登録日: Optional[datetime]
    登録変更日: Optional[datetime]

    class Config:
        from_attributes = True

class TM科目摘要PaginationSchema(BaseModel):
    items: List[TM科目摘要Schema]
    total: int
    page: int
    page_size: int
    total_pages: int