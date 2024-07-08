from fastapi import FastAPI, Depends
from api_server.database import Base, engine, get_sanwas_db
from api_server.routers.estimate_router import router
from sqlalchemy.orm import Session

app = FastAPI()

# データベーステーブルの作成
Base.metadata.create_all(bind=engine)

app.include_router(router, prefix="/api/v1")

@app.get("/")
def read_root():
    message = "Welcome to the API"
    return {"message": message}

# 新しいエンドポイント例
@app.get("/items/")
def read_items(db: Session = Depends(get_sanwas_db)):
    items = db.query(Item).all()  # 適切なモデルクラスに置き換え
    return items
