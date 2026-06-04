# Package imports
from src import *

def test_user():
    user = User()
    user.id = 123
    user.role = Role.GUEST

    other = User()
    other.id = 321
    other.role = Role.ADMIN

    assert user.is_self(user)
    assert not user.is_self(other)
    assert user.has_permissions(Role.GUEST)
    assert not user.has_permissions(Role.MANAGER)
    assert other.has_permissions(Role.GUEST)
    assert not user.is_self_or_has_greater_permissions(other)
    assert other.is_self_or_has_greater_permissions(user)
    assert not other.is_self_or_has_greater_permissions(user, Role.SUPER_ADMIN)