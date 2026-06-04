# Module imports
from .dependencies import *

class EventService(BaseService):
    def __init__(self, context: RequestContext | User | Role | None = None):
        super().__init__(context)
        self.event_dao = EventDao()

    def fetch(self, id: int) -> Event | None:
        return self.event_dao.fetch(id)
    
    def find(self, id: int) -> Event:
        event = self.fetch(id)
        if event: return event
        raise NotFoundException()
    
    def fetch_all(self) -> list[Event]:
        return self.event_dao.fetch_all()
    
    def create(self, model: EventModel) -> Event:
        if not self.user.has_permissions(Role.MANAGER): raise ForbiddenException()
        return self.event_dao.create(model)
    
    def update(self, event: Event, model: EventModel) -> Event:
        if not self.user.has_permissions(Role.MANAGER): raise ForbiddenException()
        return self.event_dao.update(event, model)
    
    def delete(self, event: Event):
        if not self.user.has_permissions(Role.MANAGER): raise ForbiddenException()
        self.event_dao.delete(event)
    