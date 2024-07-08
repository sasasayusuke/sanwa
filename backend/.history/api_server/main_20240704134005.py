
import os
from fastapi import FastAPI
from api_server.database import db_factory
from api_server.routers.estimate_router import router

app = FastAPI()

# データベースマネージャーのインスタンスを取得
sanwa_db_manager = db_factory.sanwas_db
pleasanter_db_manager = db_factory.pleasanter_db


# 環境変数から許可するオリジンを取得
allowed_origins = os.getenv("ALLOWED_ORIGINS", "").split(",")

# データベーステーブルの作成
sanwa_db_manager.base.metadata.create_all(bind=sanwa_db_manager.engine)
pleasanter_db_manager.base.metadata.create_all(bind=pleasanter_db_manager.engine)

# APIルーターの登録
app.include_router(router, prefix="/api/v1")

@app.get("/")
def read_root():
    message = "Welcome"
    return {"message": message}
