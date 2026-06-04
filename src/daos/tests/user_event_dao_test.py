# Package imports
from src import *

def test_user_event_dao(seeder: EntitySeeder):
    seeder.characters()
    seeder.events()
    dao = UserEventDao()

    # Create
    user = seeder.results.users[0]
    character = seeder.results.characters[0]
    event = seeder.results.events[0]
    dao.create(user, event, character)

    # Fetch all for user
    user_events = dao.fetch_all_for_user(user)
    assert len(user_events) == 1

    # Fetch all for event
    user_events = dao.fetch_all_for_event(event)
    assert len(user_events) == 1

    # Fetch
    user_event = dao.fetch(user, event)
    assert user_event

    # Update
    dao.update(user_event, None)
    user_event = dao.fetch(user, event)
    assert user_event and user_event.character_id == None

    # Delete
    dao.delete(user_event)
    user_event = dao.fetch(user, event)
    assert not user_event