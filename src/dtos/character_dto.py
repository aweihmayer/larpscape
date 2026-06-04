# Module imports
from .dependencies import *

class CharacterDto(BaseDto):
    id = DtoField()
    user_id = DtoField()
    name = DtoField()
    text = DtoField(dimension=Dimension.CHARACTER_DETAILS)