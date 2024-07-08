from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from typing import List, Optional

from .database import get_db
from .models.TM科目摘要 import TM科目摘要
from .schemas.TM科目摘要 import TM科目摘要Schema, TM科目摘要PaginationSchema

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


"""
TM科目摘要の一覧を取得します。

ページネーションを使用してデータを返します。

Args:
    db (Session): データベースセッション
    page (int): 取得するページ番号(1以上)
    page_size (int): 1ページあたりのアイテム数(1以上100以下)

Returns:
    TM科目摘要PaginationSchema: ページネーション情報を含むTM科目摘要のリスト

Raises:
    HTTPException: データベースエラーが発生した場合
"""

@app.get("/tm_kamoku_tekiyo", response_model=TM科目摘要PaginationSchema)
async def read_tm_kamoku_tekiyo(
    db: Session = Depends(get_db),
    page: int = Query(1, ge=1, description="ページ番号"),
    page_size: int = Query(50, ge=1, le=100, description="1ページあたりのアイテム数")
) -> TM科目摘要PaginationSchema:
    try:
        offset = (page - 1) * page_size
        total = db.query(TM科目摘要).count()
        items = db.query(TM科目摘要).offset(offset).limit(page_size).all()

        return TM科目摘要PaginationSchema(
            items=items,
            total=total,
            page=page,
            page_size=page_size,
            total_pages=(total + page_size - 1) // page_size
        )
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail="データベースエラーが発生しました")


"""
指定されたIDのTM科目摘要を取得します。

Args:
    tekiyo_id (int): 取得するTM科目摘要のID
    db (Session): データベースセッション

Returns:
    TM科目摘要Schema: 指定されたIDのTM科目摘要

Raises:
    HTTPException: 指定されたIDの項目が見つからない場合、またはデータベースエラーが発生した場合
"""
@app.get("/tm_kamoku_tekiyo/{tekiyo_id}", response_model=TM科目摘要Schema)
async def read_tm_kamoku_tekiyo_item(
    tekiyo_id: int,
    db: Session = Depends(get_db)
) -> TM科目摘要Schema:
    try:
        item = db.query(TM科目摘要).filter(TM科目摘要.id == tekiyo_id).first()
        if item is None:
            raise HTTPException(status_code=404, detail="指定されたIDの項目が見つかりません")
        return item
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail="データベースエラーが発生しました")