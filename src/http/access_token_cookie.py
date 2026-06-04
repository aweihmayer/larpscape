# Package imports
from core import *
from src.constants import *

class AccessTokenCookie(Cookie):
    def __init__(self):
        super().__init__('access_token_cookie', AuthTokenDuration.ACCESS)