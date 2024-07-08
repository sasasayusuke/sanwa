import os
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

class DatabaseManager:
    def __init__(self):
        # ... (前のコードと同じ) ...

    def execute_raw_sql(self, sql_query, params=None):
        with self.engine.connect() as connection:
            result = connection.execute(text(sql_query), params or {})
            return result.fetchall()

    def del_pattern(self, record_no, connection):
        query = f"DELETE FROM dbo.\"t_pattern\" WHERE \"RecordNo\" = '{record_no}';"
        connection.execute(text(query))
        connection.commit()

    def get_base_neis(self, record_no):
        query = """
        SELECT "ResultId", "DateA", "Class007", "Class040", "Class092"
        FROM dbo."Results"
        WHERE "SiteId" = :site_id AND "ClassB" = :record_no
        """
        params = {"site_id": os.getenv("PLEASANTER_NEIS_BASE_INFO_TABLE_ID"), "record_no": record_no}
        result = self.execute_raw_sql(query, params)
        if not result:
            raise Exception(f"E1101: No NeIS base info found for record {record_no}")
        return result[0]

    # 他のデータベース操作メソッドも同様に実装...

db_manager = DatabaseManager()
Base = db_manager.Base