# Package imports
from src import *

def test_game_object_transaction_dao(seeder: EntitySeeder):
    seeder.characters()
    character = seeder.results.characters[0]
    game_object_dao = GameObjectDao()
    dao = GameObjectTransactionDao()

    blacksmith = game_object_dao.create(GameObjectModel(
        name='Blacksmith',
        is_obtainable=True,
        max_character_units=1
    ))
    iron_ore = game_object_dao.create(GameObjectModel(
        name='Iron ore',
        is_obtainable=True,
        max_character_units=999
    ))
    iron_bar = game_object_dao.create(GameObjectModel(
        name='Iron bar',
        is_obtainable=True,
        max_character_units=999
    ))
    iron_bar.cost = { iron_ore.id: 3 }
    iron_bar.prerequisites = {blacksmith.id: 1 }

    dao.create(character, blacksmith)
    dao.create(character, iron_ore, 2)
    dao.create(character, iron_bar)
    assert dao.compute_transactions(character) == { 1: 1, 2: 2 }

    dao.create(character, iron_ore, 2)
    dao.create(character, iron_bar)
    dao.create(character, iron_bar)
    assert dao.compute_transactions(character) == { 1: 1, 2: 1, 3: 1 }

    dao.create(character, iron_bar, force=True)
    assert dao.compute_transactions(character) == { 1: 1, 2: 1, 3: 2 }