# Module imports
from .dependencies import *

class GameObjectModel(BaseModel):
    id: int = IntegerModelField(conditions=['never']) # type: ignore
    parent_id: int | None = IntegerModelField(conditions=['create', 'update']) # type: ignore
    name: str = TextModelField(conditions=['create', 'update']) # type: ignore
    auto_link_keyword: str | None = TextModelField(conditions=['create', 'update']) # type: ignore
    is_obtainable: bool = BooleanModelField(default=False, conditions=['create', 'update']) # type: ignore
    auto_obtain: bool = BooleanModelField(default=False, conditions=['create', 'update']) # type: ignore
    character_max_units: int = IntegerModelField(min=0, default=0, conditions=['create', 'update']) # type: ignore
    character_starting_units: int = IntegerModelField(min=0, default=0, conditions=['create', 'update']) # type: ignore
    contents: str = TextModelField(default='[]', conditions=['create', 'update']) # type: ignore
