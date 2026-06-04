# Package imports
from src.constants import *
from src.entities import *
from src.http import *

class BaseService:
    def __init__(self, context: RequestContext | User | Role | None = None):
        if isinstance(context, RequestContext):
            self.context = context
        elif isinstance(context, User):
            self.context = RequestContext(context)
        elif isinstance(context, Role):
            self.context = RequestContext.make(context)
        else:
            self.context = RequestContext.make(Role.SYSTEM)

        from src.services.config_service import ConfigService
        if isinstance(self, ConfigService): return
        self.configs = ConfigService()

    @property
    def user(self) -> User:
        return self.context.user