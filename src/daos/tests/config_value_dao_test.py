# Package imports
from src import *

def test_character_dao(seeder: EntitySeeder):
    dao = ConfigValueDao()

    # Fetch all
    configs = dao.fetch_all()
    assert len(configs) == len(ConfigId)

    # Fetch
    config = dao.fetch(ConfigId.MAX_CHARACTERS_PER_USER)
    assert config

    # Fetch all non secrets
    configs = dao.fetch_all_non_secret()
    assert len(configs) == len([x for x in ConfigValue.configs() if not x.is_secret])

    # Update
    new_value = 123
    config = dao.update(config, new_value)
    config = dao.fetch(config.id)
    assert config and config.value == str(new_value)

    # Reset
    dao.reset(config)
    config = dao.fetch(config.id)
    assert config and config.value == config.initial_value