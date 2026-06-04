# Package  imports
from src import *
# Third-party
import pytest

def test_character_service(seeder: EntitySeeder):
    seeder.users()
    user = seeder.results.users[0]
    service = CharacterService(user)

    # Max character creation
    service.configs.max_characters_per_user = 1
    service.create(user, seeder.models.characters[0])
    with pytest.raises(ConflictException):
        service.create(user, seeder.models.characters[1])