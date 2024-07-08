from fastapi import FastAPI
from database import get_db_manager
from routers import router as api_router

db_manager = get_db_manager()
engine = db_manager.engine
Base = db_manager.Base

# データベーステーブルの作成
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to the API"}