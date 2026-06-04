# Native imports
from datetime import datetime, timezone
# Package imports
from src.constants import *
from src.entities import *

class RequestContext:
    def __init__(self, user: User | None = None):
        self.timestamp = datetime.now(timezone.utc)
        self.user: User = user if user else User()
        if not user: self.user.role = Role.GUEST.value
        self.dimensions: list[Dimension] = []

    @staticmethod
    def make(role: Role, id: int | None = None) -> 'RequestContext':
        context = RequestContext()
        context.user = User.test(role, id)
        return context