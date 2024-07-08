import os
from sqlalchemy import create_Engine, text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# 環境変数から接続情報を取得
dialect = "mssql"
driver = "pymssql"
username = os.getenv("DB_USER")
password = os.getenv("DB_PASSWORD")
host = os.getenv("DB_HOST")
port = os.getenv("DB_PORT", "1433")
database = os.getenv("DB_NAME")
charset_type = "utf8"

# 接続URLの構築
db_url = f"{dialect}+{driver}://{username}:{password}@{host}:{port}/{database}?charset={charset_type}"

# DB接続するためのEngineインスタンス
Engine = create_Engine(db_url, echo=True)

# Sessionを作成
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=Engine)

# Baseクラスを作成
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 直接SQLを実行する関数
def execute_raw_sql(sql_query):
    with Engine.connect() as connection:
        result = connection.execute(text(sql_query))
        return result.fetchall()