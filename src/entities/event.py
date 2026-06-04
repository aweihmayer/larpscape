# Native imports
import json
# Module imports
from .dependencies import *

class Event(BaseEntity):
    id: int = IntegerField(primary_key=True) # type: ignore
    name: str = CharField() # type: ignore
    start: datetime = DateTimeField() # type: ignore
    end: datetime = DateTimeField() # type: ignore
    summary: str | None = CharField(null=True) # type: ignore
    text: str | None = TextField(null=True) # type: ignore

    @property
    def has_ended(self) -> bool:
        return self.end <= datetime.now(timezone.utc).replace(tzinfo=None)