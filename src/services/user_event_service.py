# Native imports
from datetime import datetime, timezone
# Module imports
from .dependencies import *

class UserEventService(BaseService):
    def __init__(self, context: RequestContext | User | Role | None = None):
        super().__init__(context)
        self.user_event_dao = UserEventDao()

    def fetch_all_for_user(self, user: User) -> list[UserEvent]:
        return self.fetch_all_for_user(user)
    
    def join(self, user: User, event: Event, character: Character | None = None):
        if event.has_ended: raise ConflictException()
        elif not self.user.is_self(user): raise UnauthorizedException()
        user_event = self.user_event_dao.fetch(user, event)
        if not user_event: return self.user_event_dao.create(user, event, character)
        return self.user_event_dao.update(user_event, character)
    
    def leave(self, user: User, event: Event):
        if event.has_ended: raise ConflictException()
        elif not self.user.is_self(user): raise UnauthorizedException()
        user_event = self.user_event_dao.fetch(user, event)
        if not user_event: raise NotFoundException()
        user_event.delete_instance()