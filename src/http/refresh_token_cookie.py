# Package imports
from core import *
from src.constants import *

class RefreshTokenCookie(Cookie):
    def __init__(self):
        super().__init__('refresh_token_cookie', AuthTokenDuration.REFRESH, True, True, '/api/auth/refresh')