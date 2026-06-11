# Package imports
from core import *
from src import *

def test_character_dao(seeder: EntitySeeder):
    seeder.users()
    dao = CharacterDao()

    # Create
    user = seeder.results.users[0]
    model = seeder.models.characters[0]
    dao.create(user, model)

    # Fetch all for user
    characters = dao.fetch_all_for_user(user)
    assert len(characters) == 1

    # Fetch all
    characters = dao.fetch_all()
    assert len(characters) == 1

    # Counter for user
    assert dao.count_for_user(user) == 1

    # Fetch
    character = characters[0]
    assert dao.fetch(characters[0].id)

    # Update
    new_name = 'Sauron'
    model.name = new_name
    dao.update(character, model)
    character = dao.fetch(character.id)
    assert character and character.name == new_name

    # Delete
    dao.delete(character)
    character = dao.fetch(character.id)
    assert character and character.is_deleted

    