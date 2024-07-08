from sqlalchemy import Column, SmallInteger, String, DateTime
from ..database import Base

class TM科目摘要(Base):
    __tablename__ = 'TM科目摘要'

    科目CD = Column(SmallInteger, primary_key=True)
    摘要CD = Column(SmallInteger, primary_key=True)
    摘要名 = Column(String(20), nullable=False)
    初期登録日 = Column(DateTime)
    登録変更日 = Column(DateTime)

    def __repr__(self):
        return f"<TM科目摘要(科目CD={self.科目CD}, 摘要CD={self.摘要CD}, 摘要名='{self.摘要名}')>"