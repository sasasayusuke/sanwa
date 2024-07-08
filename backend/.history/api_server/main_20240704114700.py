from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from api_server.database import sanwa_base, sanwas_engine
from api_server.routers.estimate_router import router

app = FastAPI()

# データベーステーブルの作成
sanwa_base.metadata.create_all(bind=sanwas_engine)  # SanwasBase または PleasanterBase を選択

app.include_router(router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to the API"}

@app.get("/items/")
def read_items(db: Session = Depends(db_factory.get_sanwas_db)):
    items = db.query(Item).all()  # 適切なモデルクラスに置き換え
    return items
