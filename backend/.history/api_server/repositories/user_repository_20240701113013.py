
# repositories/user_repository.py
from ..models.TM科目摘要 import User

class UserRepository:
    async def get_user_by_id(self, user_id: int):
        # ここでデータベースアクセスを行う
        # この例では簡単のためにモックデータを返す
        return User(id=user_id, name=f"User {user_id}")