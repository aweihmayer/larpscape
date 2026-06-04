# Native imports
import copy
# Package imports
from src import *
# Test imports
from src.models.tests import model_test_data

class _models:
    def __init__(self):
        self.users = copy.deepcopy(model_test_data.USERS)
        self.characters = copy.deepcopy(model_test_data.CHARACTERS)
        self.events = copy.deepcopy(model_test_data.EVENTS)
        self.products = copy.deepcopy(model_test_data.PRODUCTS)
        self.game_objects = copy.deepcopy(model_test_data.GAME_OBJECTS)

    def get_user_characters(self, index: int) -> list[CharacterModel]:
        starting_index = 3 * index
        return [
            self.characters[starting_index],
            self.characters[starting_index + 1],
            self.characters[starting_index + 2]]
    
class _results:
    def __init__(self):
        self.users: list[User] = []
        self.characters: list[Character] = []
        self.events: list[Event] = []
        self.products: list[Product] = []
        self.game_objects: list[GameObject] = []

class EntitySeeder:
    def __init__(self):
        self.models = _models()
        self.results = _results()

    def users(self):
        dao = UserDao()
        for x in self.models.users:
            user = dao.create(x, False)
            self.results.users.append(user)

    def characters(self):
        self.users()
        user_dao = UserDao()
        character_dao = CharacterDao()
        for i, u in enumerate(self.models.users):
            user = user_dao.fetch_by_username(u.username)
            assert user
            characters = self.models.get_user_characters(i)
            for c in characters:
                character = character_dao.create(user, c)
                self.results.characters.append(character)

    def events(self):
        dao = EventDao()
        for x in self.models.events:
            event = dao.create(x)
            self.results.events.append(event)

    def products(self):
        dao = ProductDao()
        for x in self.models.products:
            product = dao.create(x)
            self.results.products.append(product)

    def game_objects(self):
        dao = GameObjectDao()
        for x in self.models.game_objects:
            user = dao.create(x)
            self.results.game_objects.append(user)