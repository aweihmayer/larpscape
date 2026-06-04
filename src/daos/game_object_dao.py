# Module imports
from .dependencies import *

class GameObjectDao:
    def fetch(self, id: int) -> GameObject | None:
        return GameObject.get_or_none(GameObject.id == id)
    
    def fetch_all(self) -> list[GameObject]:
        return list(GameObject.select())
    
    def create(self, model: GameObjectModel) -> GameObject:
        obj = GameObject()
        return self.update(obj, model)
    
    def update(self, obj: GameObject, model: GameObjectModel) -> GameObject:
        model.fill(obj, 'update')
        if not obj.is_obtainable:
            obj.auto_obtain = False
            obj.character_max_units = 0
            obj.character_starting_units = 0

        obj.save()
        self._delete_relations(obj)
        self._create_relations(obj)

        return obj
    
    def delete(self, obj: GameObject):
        self._delete_relations(obj)
        obj.soft_delete_instance()

    def fetch_relations(self, obj: GameObject) -> list[GameObjectRelation]:
        return list(
            GameObjectRelation.select().where(
                (GameObjectRelation.game_object_id_1 == obj.id)
                | (GameObjectRelation.game_object_id_2 == obj.id)
            )
        )

    def _delete_relations(self, obj: GameObject):
        GameObjectRelation.delete().where(
            (GameObjectRelation.game_object_id_1 == obj.id)
            | (GameObjectRelation.game_object_id_2 == obj.id)
        ).execute()

    def _create_relations(self, obj: GameObject):
        relations = []
        for x in self.fetch_all():
            if obj.id == x.id: continue
            elif ((obj.auto_link_keyword and obj.auto_link_keyword in x.contents_json)
                or (x.auto_link_keyword and x.auto_link_keyword in obj.contents_json)):
                related = GameObjectRelation()
                related.game_object_id_1 = obj.id if obj.id > x.id else x.id
                related.game_object_id_2 = obj.id if obj.id < x.id else x.id
                relations.append(related)

        if relations: GameObjectRelation.bulk_create(relations)