# Module imports
from .dependencies import *

class CharacterGameObjectService(BaseService):
    def __init__(self, context: RequestContext | User | Role | None = None):
        super().__init__(context)
        self.game_object_dao = GameObjectDao()
        self.game_object_transaction_dao = GameObjectTransactionDao()

    def obtain(self,
        character: Character,
        obj: GameObject,
        quantity: int = 1,
        force: bool = False
    ):
        if quantity <= 0: return
        elif not obj.is_obtainable: raise BadRequestException()
        elif not self.user.is_self(character.user_id): raise UnauthorizedException()
        elif not force and not obj.character_can_obtain(character): raise ConflictException()

        self.game_object_transaction_dao.create(character, obj, quantity, force)

        objs = self.game_object_dao.fetch_all()
        for x in objs:
            if not x.is_obtainable or not x.auto_obtain: continue
            self.obtain(character, obj)

    def exchange(self):
        pass # TODO