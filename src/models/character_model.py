# Module imports
from .dependencies import *

class CharacterModel(BaseModel):
    id: int = IntegerModelField(conditions='never') # type: ignore
    name: str = CharModelField(conditions='create,update') # type: ignore
    text: str = TextModelField(conditions='create,update') # type: ignore