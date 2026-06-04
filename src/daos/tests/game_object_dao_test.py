# Package imports
from src import *

def test_game_object_dao(seeder: EntitySeeder):
    dao = GameObjectDao()

    # Create
    model = seeder.models.game_objects[0]
    dao.create(model)

    # Fetch all
    objs = dao.fetch_all()
    assert len(objs) == 1

    # Fetch
    obj = dao.fetch(objs[0].id)
    assert obj
    
    # Update
    new_name = 'Silver coins'
    model.name = new_name
    dao.update(obj, model)
    obj = dao.fetch(obj.id)
    assert obj and obj.name == new_name

    # Create relation
    dao.create(seeder.models.game_objects[1])
    relations = dao.fetch_relations(obj)
    assert len(relations) == 1

    # Change relation
    dao.create(seeder.models.game_objects[1])
    model.auto_link_keyword = '[Silver coins]'
    dao.update(obj, model)
    relations = dao.fetch_relations(obj)
    assert len(relations) == 0

    # Delete
    dao.delete(obj)
    obj = dao.fetch(obj.id)
    assert obj and obj.is_deleted