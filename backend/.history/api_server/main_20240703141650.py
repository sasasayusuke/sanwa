from fastapi import FastAPI
from .routers import router as estimate_router
app = FastAPI()

"""
ルートエンドポイント。

アプリケーションの動作確認用の簡単なメッセージを返します。

Returns:
    dict: メッセージを含む辞書
"""
@app.get("/")
async def root() -> dict:
    message = "Hello World"
    return {"message": message}

app = FastAPI()

app.include_router(estimate_router, prefix="/api/v1", tags=["estimates"])