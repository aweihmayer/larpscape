# Module imports
from src.http.request_context import RequestContext

class RequestServices:
    def __init__(self, context: RequestContext):
        from src.services import AuthService, ConfigService, UserService
        self.auth = AuthService(context)
        self.config = ConfigService(context)
        self.user = UserService(context)