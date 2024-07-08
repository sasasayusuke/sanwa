import os
from typing import Optional
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from threading import Lock

class DatabaseManager:
    _instance = None
    _lock = Lock()

    def __new__(cls):
        with cls._lock:
            if cls._instance is None:
                cls._instance = super(DatabaseManager, cls).__new__(cls)
                cls._instance.initialized = False
        return cls._instance

    def __init__(self):
        if self.initialized:
            return
        self.dialect = "mssql"
        self.driver = "pymssql"
        self.username = os.getenv("DB_USER")
        self.password = os.getenv("DB_PASSWORD")
        self.host = os.getenv("DB_HOST")
        self.port = os.getenv("DB_PORT")
        self.database = os.getenv("DB_NAME")
        self.charset_type = "utf8"

        self.db_url = self._construct_db_url()
        self.engine = create_engine(self.db_url, echo=True)
        self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
        self.Base = declarative_base()
        self.initialized = True

    def _construct_db_url(self):
        return f"{self.dialect}+{self.driver}://{self.username}:{self.password}@{self.host}:{self.port}/{self.database}?charset={self.charset_type}"

    def get_db(self):
        db = self.SessionLocal()
        try:
            yield db
        finally:
            db.close()

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

# グローバル変数としてインスタンスを作成
db_manager = DatabaseManager.get_instance()

# 便利な関数をエクスポート
get_db = db_manager.get_db
execute_raw_sql = db_manager.execute_raw_sql
Base = db_manager.Base
engine = db_manager.engine