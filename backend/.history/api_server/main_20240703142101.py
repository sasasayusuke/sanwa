from fastapi import FastAPI
from .routers import estimate as estimate_router

app = FastAPI()

app.include_router(estimate_router.router, prefix="/api/v1/estimates", tags=["estimates"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Estimate API"}