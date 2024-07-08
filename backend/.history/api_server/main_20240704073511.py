from email import message
from fastapi import FastAPI
from api_server.database import engine, Base
from api_server.routers import router as api_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def read_root():
    message = "Welcome to the API"
    return {"message": message}