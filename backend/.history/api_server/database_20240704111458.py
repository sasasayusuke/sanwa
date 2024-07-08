import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from threading import Lock
from abc import ABC, abstractmethod

class DatabaseManagerBase(ABC):
    def __init__(self):
        self.dialect = "mssql"
        self.driver = "pymssql"
        self.charset_type = "utf8"
        self.engine = None
        self.SessionLocal = None
        self.Base = declarative_base()

    @abstractmethod
    def _construct_db_url(self):
        pass

    def initialize(self):
        self.db_url = self._construct_db_url()
        self.engine = create_engine(self.db_url, echo=True)
        self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)

    def get_db(self):
        db = self.SessionLocal()
        try:
            yield db
        finally:
            db.close()

    def _construct_db_url(self):
        return f"{self.dialect}+{self.driver}://{self.username}:{self.password}@{self.host}:{self.port}/{self.database}?charset={self.charset_type}"


class SanwasDBManager(DatabaseManagerBase):
    def __init__(self):
        super().__init__()
        self.username = os.getenv("DB_USER")
        self.password = os.getenv("DB_PASSWORD")
        self.host = os.getenv("DB_HOST")
        self.port = os.getenv("DB_PORT")
        self.database = "SanwaSDB"
        self.initialize()

class PleasanterDBManager(DatabaseManagerBase):
    def __init__(self):
        super().__init__()
        self.username = os.getenv("DB_USER")
        self.password = os.getenv("DB_PASSWORD")
        self.host = os.getenv("DB_HOST")
        self.port = os.getenv("DB_PORT")
        self.database = "Implem.Pleasanter"
        self.initialize()

    def _construct_db_url(self):
        return f"{self.dialect}+{self.driver}://{self.username}:{self.password}@{self.host}:{self.port}/{self.database}?charset={self.charset_type}"

class DatabaseManagerFactory:
    _instance = None
    _lock = Lock()

    def __new__(cls):
        with cls._lock:
            if cls._instance is None:
                cls._instance = super(DatabaseManagerFactory, cls).__new__(cls)
                cls._instance.sanwas_db = SanwasDBManager()
                cls._instance.pleasanter_db = PleasanterDBManager()
        return cls._instance

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def get_sanwas_db(self):
        return self.sanwas_db.get_db()

    def get_pleasanter_db(self):
        return self.pleasanter_db.get_db()

# グローバル変数としてファクトリインスタンスを作成
db_factory = DatabaseManagerFactory.get_instance()

# 便利な関数をエクスポート
get_sanwas_db = db_factory.get_sanwas_db
get_pleasanter_db = db_factory.get_pleasanter_db
SanwasBase = db_factory.sanwas_db.Base
PleasanterBase = db_factory.pleasanter_db.Base
sanwas_engine = db_factory.sanwas_db.engine
pleasanter_engine = db_factory.pleasanter_db.engine