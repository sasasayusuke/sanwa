import os
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

class DatabaseManager:
    def __init__(self):
        self.dialect = "mssql"
        self.driver = "pymssql"
        self.username = os.getenv("DB_USER")
        self.password = os.getenv("DB_PASSWORD")
        self.host = os.getenv("DB_HOST")
        self.port = os.getenv("DB_PORT")
        self.database = os.getenv("DB_NAME")
        self.charset_type = "utf8"

        self.db_url = f"{self.dialect}+{self.driver}://{self.username}:{self.password}@{self.host}:{self.port}/{self.database}?charset={self.charset_type}"
        self.engine = create_engine(self.db_url, echo=True)
        self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
        self.Base = declarative_base()

    def get_db(self):
        db = self.SessionLocal()
        try:
            yield db
        finally:
            db.close()

    def execute_raw_sql(self, sql_query, params=None):
        with self.engine.connect() as connection:
            result = connection.execute(text(sql_query), params or {})
            return result.fetchall()

db_manager = DatabaseManager()
Base = db_manager.Base