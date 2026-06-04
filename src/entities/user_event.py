# Module imports
from .dependencies import *

class UserEvent(BaseEntity):
    user_id: int = IntegerField() # type: ignore
    event_id: int = IntegerField() # type: ignore
    character_id: int | None = IntegerField(null=True) # type: ignore

    class Meta:
        primary_key = CompositeKey('user_id', 'event_id')