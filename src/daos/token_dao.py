# Native imports
from datetime import datetime, timezone
import uuid
# Module imports
from .dependencies import *

class TokenDao:
    def fetch(self, id: uuid.UUID) -> Token | None:
        return Token.get_or_none(
            (Token.id == id) & (Token.expiration_timestamp > datetime.now(timezone.utc)))
    
    def fetch_for_user(self, user: User, token_type: TokenType) -> Token | None:
        return Token.get_or_none(
            (Token.token_type == token_type.value)
            & (Token.user_id == user.id)
            & (Token.expiration_timestamp > datetime.now(timezone.utc)))
    
    def create(self, user: User, token_type: TokenType) -> Token:
        token = Token()
        token.token_type = token_type.value
        token.user_id = user.id
        if token_type == TokenType.ACCESS:
            token.duration = AuthTokenDuration.ACCESS
        elif token_type == TokenType.REFRESH:
            token.duration = AuthTokenDuration.REFRESH
        token.refresh()
        token.save(force_insert=True)
        return token