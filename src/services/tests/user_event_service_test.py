# Native imports
from datetime import datetime
# Package imports
from core import *
from src import *
# Third-party imports
import pytest

def test_user_event_service(seeder: EntitySeeder):
    seeder.users()
    seeder.events()
    user = seeder.results.users[0]
    past_event = next(x for x in seeder.results.events if x.end < datetime.now())
    service = UserEventService(user)

    # Join past event
    with pytest.raises(ConflictException):
        service.join(user, past_event)

    # Leave past event
    with pytest.raises(ConflictException):
        service.leave(user, past_event)