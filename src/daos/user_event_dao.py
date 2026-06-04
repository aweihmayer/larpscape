# Module imports
from .dependencies import *

class UserEventDao:
    def fetch(self, user: User, event: Event) -> UserEvent | None:
        return UserEvent.get_or_none(
            (UserEvent.user_id == user.id) & (UserEvent.event_id == event.id)
        )
    
    def fetch_all_for_user(self, user: User) -> list[UserEvent]:
        return list(UserEvent.select().where(UserEvent.user_id == user.id))
    
    def fetch_all_for_event(self, event: Event) -> list[UserEvent]:
        return list(UserEvent.select().where(UserEvent.event_id == event.id))

    def create(self, user: User, event: Event, character: Character | None = None) -> UserEvent:
        user_event = UserEvent()
        user_event.user_id = user.id
        user_event.event_id = event.id
        user_event.character_id = character.id if character else None
        user_event.save(force_insert=True)
        return user_event

    def update(self, user_event: UserEvent, character: Character | None = None) -> UserEvent:
        user_event.character_id = character.id if character else None
        user_event.save()
        return user_event

    def delete(self, user_event: UserEvent):
        user_event.delete_instance()