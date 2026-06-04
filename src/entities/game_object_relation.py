# Module imports
from .dependencies import *

class GameObjectRelation(BaseEntity):
    game_object_id_1: int = IntegerField() # type: ignore
    game_object_id_2: int = IntegerField() # type: ignore

    class Meta:
        primary_key = CompositeKey('game_object_id_1', 'game_object_id_2')