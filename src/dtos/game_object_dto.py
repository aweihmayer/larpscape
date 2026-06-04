# Module imports
from .dependencies import *

class GameObjectDto(BaseDto):
    id = DtoField()
    parent_id = DtoField()
    name = DtoField()
    is_obtainable = DtoField()

    character_max_units = DtoField(dimension=Dimension.GAME_OBJECT_DETAILS)
    contents = DtoField(dimension=Dimension.GAME_OBJECT_DETAILS)
    cost = DtoField(dimension=Dimension.GAME_OBJECT_DETAILS)
    prerequisites = DtoField(dimension=Dimension.GAME_OBJECT_DETAILS)

    auto_obtain = DtoField(dimension=Dimension.GAME_OBJECT_DETAILS, role=Role.MANAGER)
    starting_units = DtoField(dimension=Dimension.GAME_OBJECT_DETAILS, role=Role.MANAGER)
    auto_link_keyword = DtoField(dimension=Dimension.GAME_OBJECT_DETAILS, role=Role.MANAGER)