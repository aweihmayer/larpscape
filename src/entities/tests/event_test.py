# Native imports
from datetime import datetime, timedelta
# Package imports
from src import *

def test_event():
    event = Event()
    event.end = datetime.now() + timedelta(days=-1)
    assert event.has_ended