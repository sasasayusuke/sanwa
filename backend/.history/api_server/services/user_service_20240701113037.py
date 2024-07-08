# services/user_service.py
from ..models.TM科目摘要 import User
from typing import List

class UserService:
    async def get_users(self) -> List[User]:
        # ここでは例として、ハードコードされたユーザーのリストを返します
        return [
            User(id=1, name="User 1"),
            User(id=2, name="User 2"),
            User(id=3, name="User 3")
        ]