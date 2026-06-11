# Package imports
from core import *
from src import *

def test_token_dao(seeder: EntitySeeder):
    seeder.users()
    dao = TokenDao()

    # Create
    user = seeder.results.users[0]
    dao.create(user, TokenType.ACCESS)

    # Fetch for user
    token = dao.fetch_for_user(user, TokenType.ACCESS)
    assert token

    # Fetch
    assert dao.fetch(token.id)

    # Fetch not expired
    token.expire()
    token.save()
    assert not dao.fetch(token.id)