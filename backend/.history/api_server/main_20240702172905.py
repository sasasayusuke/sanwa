from fastapi import FastAPI
app = FastAPI()

"""
ルートエンドポイント。

アプリケーションの動作確認用の簡単なメッセージを返します。

Returns:
    dict: 挨拶メッセージを含む辞書
"""
@app.get("/")
async def root() -> dict:
    message = "Hello World"
    return {"message": message}

