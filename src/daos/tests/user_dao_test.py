# Package imports
from src import *

def test_user_dao(seeder: EntitySeeder):
    dao = UserDao()

    # Create
    model = seeder.models.users[0]
    dao.create(model, True)

    # Fetch by username
    user = dao.fetch_by_username(model.username)
    assert user

    # Fetch
    assert dao.fetch(user.id)

    # Fetch by email
    assert dao.fetch_by_email(model.email)

    # Fetch all
    assert len(dao.fetch_all()) == 2

    # Update
    new_first_name = 'Alejandro'
    model.first_name = new_first_name
    dao.update(user, model)
    user = dao.fetch(user.id)
    assert user and user.first_name == new_first_name

    # Confirm
    assert not user.is_active
    dao.confirm(user)
    user = dao.fetch(user.id)
    assert user and user.is_active

    # Delete
    dao.delete(user)
    user = dao.fetch(user.id)
    assert user and user.is_deleted