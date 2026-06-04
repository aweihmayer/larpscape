# Module imports
from .dependencies import *

class CharacterDao:
    def fetch(self, id: int) -> Character | None:
        return Character.get_or_none(Character.id == id)
    
    def fetch_all(self) -> list[Character]:
        return list(Character.select())
    
    def fetch_all_for_user(self, user: User) -> list[Character]:
        return list(Character.select().where(Character.user_id == user.id))
    
    def count_for_user(self, user: User) -> int:
        return Character.select().where(Character.user_id == user.id).count()
    
    def create(self, user: User, model: CharacterModel) -> Character:
        character = Character()
        character.user_id = user.id
        return self.update(character, model)
    
    def update(self, character: Character, model: CharacterModel) -> Character:
        model.fill(character, 'update')
        character.save()
        return character
    
    def delete(self, character: Character):
        character.soft_delete_instance()