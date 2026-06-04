# Package imports
from src import *

def test_event_dao(seeder: EntitySeeder):
    dao = EventDao()

    # Create
    model = seeder.models.events[0]
    dao.create(model)

    # Fetch all
    events = dao.fetch_all()
    assert len(events) == 1

    # Fetch
    event = events[0]
    assert dao.fetch(event.id)

    # Update
    new_name = 'Chapter 1 - Reign of Darkness'
    model.name = new_name
    dao.update(event, model)
    event = dao.fetch(event.id)
    assert event and event.name == new_name

    # Delete
    dao.delete(event)
    event = dao.fetch(event.id)
    assert event and event.is_deleted

    