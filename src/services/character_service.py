# Module imports
from .dependencies import *
from src.services.character_game_object_service import CharacterGameObjectService
from src.services.game_object_service import GameObjectService

class CharacterService(BaseService):
    def __init__(self, context: RequestContext | User | Role | None = None):
        super().__init__(context)
        self.character_dao = CharacterDao()
        self.game_object_service = GameObjectService()
        self.character_game_object_service = CharacterGameObjectService()

    def fetch(self, id: int) -> Character | None:
        return self.character_dao.fetch(id)
    
    def find(self, id: int) -> Character:
        character = self.fetch(id)
        if character: return character
        raise NotFoundException()
    
    def fetch_all(self) -> list[Character]:
        return self.character_dao.fetch_all()
    
    def fetch_all_for_user(self, user: User) -> list[Character]:
        return self.character_dao.fetch_all_for_user(user)
    
    def create(self, user: User, model: CharacterModel) -> Character:
        # Check if character can be created
        max = self.configs.max_characters_per_user
        count = self.character_dao.count_for_user(self.user)
        if not self.user.has_permissions(Role.REFEREE) and count >= max:
            raise ConflictException()
        
        # Create new character
        character = self.character_dao.create(user, model)

        # Give starting objects
        for obj in self.game_object_service.fetch_all():
            self.character_game_object_service.obtain(
                character, obj, obj.character_starting_units, True
            )

        return character

    def update(self, character: Character, model: CharacterModel) -> Character:
        if not self.user.is_self(character.user_id): raise ForbiddenException()
        return self.character_dao.update(character, model)

    def delete(self, character: Character):
        if not self.user.is_self(character.user_id): raise ForbiddenException()
        self.character_dao.delete(character)