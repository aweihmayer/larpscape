# Native imports
from datetime import datetime, timedelta
# Package imports
from src import *

def test_game_object():
    obj = GameObject()
    obj.is_obtainable = True
    obj.character_max_units = 999
    obj.cost = { 1: 1, 2: 1 }
    assert not obj.character_can_obtain({ 1: 1 })

    assert obj.character_can_obtain({ 1: 1, 2: 2 })

    obj.prerequisites = { 3: 3, 4: 4 }
    assert not obj.character_can_obtain({ 1: 1, 2: 2 })

    assert obj.character_can_obtain({ 1: 1, 2: 2, 3: 4, 4: 8 })