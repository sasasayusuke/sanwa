from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from .database import get_db
from .models.TM科目摘要 import TM科目摘要
from .schemas.TM科目摘要 import TM科目摘要Schema, TM科目摘要PaginationSchema

app = FastAPI()
