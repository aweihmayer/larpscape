# Module imports
from .dependencies import *
from src.services.email_service import EmailService

class UserService(BaseService):
    def __init__(self, context: RequestContext | User | Role | None = None):
        super().__init__(context)
        self.user_dao = UserDao()
        self.email_service = EmailService(context)

    def fetch(self, identity: int | str) -> User | None:
        # By email or username
        if isinstance(identity, str):
            if string_helpers.is_email(identity):
                return self.user_dao.fetch_by_email(identity)
            else:
                return self.user_dao.fetch_by_username(identity)
        # By id
        else:
            return self.user_dao.fetch(identity)
        
    def find(self, identity: int | str) -> User:
        user = self.fetch(identity)
        if user: return user
        raise NotFoundException()
        
    def fetch_all(self) -> list[User]:
        return self.user_dao.fetch_all()
    
    def create(self, model: UserModel) -> User:
        # Check if user can be created
        if not self.configs.open_user_signup and not self.user.has_permissions(Role.MANAGER):
            raise ForbiddenException()
        
        # Check if the user already exists
        if self.fetch(model.username) or self.fetch(model.email):
            raise ConflictException()
        
        # TODO check min      
        # TODO make sure role assignment is safe
        if self.user.role == Role.GUEST or model.role == None:
            model.role = Role.MEMBER

        requires_confirmation = self.configs.signup_requires_email_confirmation
        user = self.user_dao.create(model, requires_confirmation)
        if requires_confirmation: self.email_service.send_confirmation(user)
        return user
    
    def update(self, user: User, model: UserModel) -> User:
        if not self.user.is_self(user): raise ForbiddenException()
        return self.user_dao.update(user, model)
    
    def confirm(self, user: User) -> User:
        return self.user_dao.confirm(user)
    
    def delete(self, user: User):
        if not self.user.is_self(user): raise ForbiddenException()
        self.user_dao.delete(user)