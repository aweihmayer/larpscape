# Package  imports
from core import *
from src import *
# Third-party
import pytest

def test_user_service(seeder: EntitySeeder):
    service = UserService(Role.GUEST)
    model = seeder.models.users[0]

    # Guest forbidden to create user for private games
    with pytest.raises(ForbiddenException):
        service.create(model)

    # Make game public to open user creation
    service.configs.open_user_signup = True
    service.create(model)

    # User conflict
    with pytest.raises(ConflictException):
        service.create(model)