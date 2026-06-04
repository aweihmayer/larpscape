# Module imports
from .dependencies import *

class GameObjectService(BaseService):
    def __init__(self, context: RequestContext | User | Role | None = None):
        super().__init__(context)
        self.game_object_dao = GameObjectDao()

    def fetch(self, id: int) -> GameObject | None:
        return self.game_object_dao.fetch(id)
    
    def fetch_all(self) -> list[GameObject]:
        return self.game_object_dao.fetch_all()
    
    def find(self, id: int) -> GameObject:
        obj = self.game_object_dao.fetch(id)
        if obj: return obj
        raise NotFoundException()
    
    def create(self, model: GameObjectModel) -> GameObject:
        if not self.user.has_permissions(Role.MANAGER): raise ForbiddenException()
        self.game_object_dao.create(model)
        return obj
    
    def update(self, obj: GameObject, model: GameObjectModel) -> GameObject:
        if not self.user.has_permissions(Role.MANAGER): raise ForbiddenException()
        self.game_object_dao.update(obj, model)
        return obj
    
    def delete(self, obj: GameObject):
        if not self.user.has_permissions(Role.MANAGER): raise ForbiddenException()
        self.game_object_dao.delete(obj)