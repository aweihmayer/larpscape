# Module imports
from .dependencies import *

class EventDao:
    def fetch(self, id: int) -> Event | None:
        return Event.get_or_none(Event.id == id)
    
    def fetch_all(self) -> list[Event]:
        return list(Event.select())
    
    def create(self, model: EventModel) -> Event:
        event = Event()
        return self.update(event, model)

    def update(self, event: Event, model: EventModel) -> Event:
        model.fill(event, 'update')
        event.save()
        return event

    def delete(self, event: Event):
        event.soft_delete_instance()
        # TODO delete relations