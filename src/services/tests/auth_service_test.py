# Package imports
from src import *
# Third-party
import pytest

def test_auth_service(seeder: EntitySeeder):
    seeder.users()
    user = seeder.results.users[0]
    model = seeder.models.users[0]
    service = AuthService(Role.GUEST)

    # Signin
    access_token_1, refresh_token_1 = service.signin(user, model.password)
    access_token_2, refresh_token_2 = service.signin(user, model.password)
    assert access_token_1.id == access_token_2.id
    assert refresh_token_1.id == refresh_token_2.id
    user = service.fetch_user_by_token(access_token_1.id)
    assert user
    assert user.username == model.username

    # Signin to member account as manager
    service = AuthService(Role.MANAGER)
    service.signin(user)

    # Signin to admin account as manager
    user = service.user_service.find(1)
    with pytest.raises(UnauthorizedException):
        service.signin(user)