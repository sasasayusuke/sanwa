from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from api_server.database import db_factory
from api_server.routers.estimate_router import router

app = FastAPI()

# データベースマネージャーのインスタンスを取得
sanwa_db_manager = db_factory.sanwas_db
pleasanter_db_manager = db_factory.pleasanter_db

# データベーステーブルの作成
# 注意: 本番環境では、マイグレーションツールの使用を検討してください
sanwa_db_manager.base.metadata.create_all(bind=sanwa_db_manager.engine)
pleasanter_db_manager.base.metadata.create_all(bind=pleasanter_db_manager.engine)

# APIルーターの登録
app.include_router(router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to the API"}

# データベース接続のテスト（オプション）
@app.on_event("startup")
async def startup_event():
    sanwa_db_manager.test_connection()
    pleasanter_db_manager.test_connection()

# アプリケーション終了時のクリーンアップ（オプション）
@app.on_event("shutdown")
async def shutdown_event():
    sanwa_db_manager.session.remove()
    pleasanter_db_manager.session.remove()