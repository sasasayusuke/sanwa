from fastapi import FastAPI
from .database import Base, engine
from routers.estimate_router import router as api_router

app = FastAPI()

# データベーステーブルの作成
Base.metadata.create_all(bind=engine)

app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def read_root():
    message = "Welcome to the API"
    return {"message": message}
