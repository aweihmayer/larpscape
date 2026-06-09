# Module imports
from .dependencies import *

class EventModel(BaseModel):
    id: int = IntegerModelField(conditions=['never']) # type: ignore
    name: str = TextModelField(conditions=['create', 'update']) # type: ignore
    start: datetime = DateTimeModelField(conditions=['create', 'update']) # type: ignore
    end: datetime = DateTimeModelField(conditions=['create', 'update']) # type: ignore
    summary: str | None = TextModelField(conditions=['create', 'update']) # type: ignore
    text: str = TextModelField(conditions=['create', 'update']) # type: ignore