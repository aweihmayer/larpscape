# Module imports
from .dependencies import *

class UserDao:
    def fetch(self, id: int) -> User | None:
        return User.get_or_none(User.id == id)
    
    def fetch_by_username(self, username: str) -> User | None:
        return User.get_or_none(User.username == username)
    
    def fetch_by_email(self, email: str) -> User | None:
        return User.get_or_none(User.email == email)
    
    def fetch_all(self) -> list[User]:
        return list(User.select())

    def create(self, model: UserModel, requires_confirmation: bool) -> User:
        user = User()
        model.fill(user, 'create')
        user.salt = string_helpers.create_salt()
        user.password = string_helpers.encrypt(model.password, user.salt)
        user.role = Role.MEMBER
        user.is_active = not requires_confirmation
        return self.update(user, model)

    def update(self, user: User, model: UserModel) -> User:
        model.fill(user, 'update')
        user.save()
        return user
    
    def confirm(self, user: User) -> User:
        user.is_active = True
        user.save()
        return user
    
    def delete(self, user: User):
        user.soft_delete_instance()
        # TODO delete relations