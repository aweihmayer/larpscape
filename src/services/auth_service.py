# Native imports
import uuid
# Module imports
from .dependencies import *
from .user_service import UserService

class AuthService(BaseService):
    def __init__(self, context: RequestContext | User | Role | None = None):
        super().__init__(context)
        self.token_dao = TokenDao()
        self.user_service = UserService(context)

    def signin(self, user: User, password: str | None = None) -> tuple[Token, Token]:
        if password:
            if not string_helpers.validate_encrypted_value(password, user.password, user.salt):
                raise UnauthorizedException()
        elif not self.user.is_self_or_has_greater_permissions(user, Role.MANAGER):
            raise UnauthorizedException()
        
        refresh_token = self.token_dao.fetch_for_user(user, TokenType.REFRESH)
        if not refresh_token: refresh_token = self.token_dao.create(user, TokenType.REFRESH)

        access_token = self.token_dao.fetch_for_user(user, TokenType.ACCESS)
        if not access_token: access_token = self.token_dao.create(user, TokenType.ACCESS)

        return (access_token, refresh_token)
    
    def refresh(self, user: User) -> tuple[Token, Token]:
        refresh_token = self.token_dao.fetch_for_user(user, TokenType.REFRESH)
        if not refresh_token: refresh_token = self.token_dao.create(user, TokenType.REFRESH)

        access_token = self.token_dao.fetch_for_user(user, TokenType.ACCESS)
        if not access_token: access_token = self.token_dao.create(user, TokenType.ACCESS)

        return (access_token, refresh_token)


    def fetch_user_by_token(self, id: uuid.UUID) -> User | None:
        token = self.token_dao.fetch(id)
        if not token: return None
        return self.user_service.fetch(token.user_id)