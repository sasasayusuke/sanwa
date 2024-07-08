from fastapi import FastAPI
from routers import router as estimate_router
from database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(estimate_router, prefix="/api/v1", tags=["estimates"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Estimate API"}