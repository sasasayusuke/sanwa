from fastapi import FastAPI
from api_server.database import Base, engine
from api_server.routers.estimate_router import router

app = FastAPI()

# データベーステーブルの作成
Base.metadata.create_all(bind=engine)

app.include_router(router, prefix="/api/v1")

@app.get("/")
def read_root():
    message = "Welcome to the API"
    return {"message": message}
