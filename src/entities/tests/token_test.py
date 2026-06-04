# Package imports
from src import *

def test_token():
    token = Token()

    token.duration = 10
    token.refresh()
    assert not token.is_expired

    token.expire()
    assert token.is_expired