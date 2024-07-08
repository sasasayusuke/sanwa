from fastapi import FastAPI
from api_server.routers import router as estimate_router
from api_server.database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI()
@app.get("/")
def read_root():
    return {"message": "Welcome to the Estimate API"}