# Module imports
from .dependencies import *

class Character(BaseEntity):
    id: int = IntegerField(primary_key=True) # type: ignore
    user_id: int = IntegerField() # type: ignore
    name: str = CharField() # type: ignore
    text: str | None = TextField(null=True) # type: ignore

