# Native imports
import json
# Module imports
from .dependencies import *
from src.entities.character import Character

class GameObject(BaseEntity):
    id: int = IntegerField(primary_key=True) # type: ignore
    parent_id: int | None = IntegerField(null=True) # type: ignore
    name: str = CharField() # type: ignore
    auto_link_keyword: str | None = CharField(null=True) # type: ignore
    is_obtainable: bool = BooleanField(default=False) # type: ignore
    auto_obtain: bool = BooleanField(default=False) # type: ignore
    character_max_units: int = IntegerField(default=0) # type: ignore
    character_starting_units: int = IntegerField(default=0) # type: ignore
    contents_json: str = TextField(default='[]') # type: ignore
    cost_json: str = TextField(default='{}') # type: ignore
    value_json: str = TextField(default='{}') # type: ignore
    prerequisites_json: str = TextField(default='{}') # type: ignore

    def character_can_obtain(self, collection: dict[int, int], quantity: int = 1) -> bool:
        if not self.is_obtainable:
            return False
        elif self.id in collection and collection[self.id] >= self.character_max_units:
            return False
        
        for id, qty in self.prerequisites.items():
            if id not in collection: return False
            elif collection[id] < qty: return False

        for id, qty in self.cost.items():
            if id not in collection: return False
            elif collection[id] < (qty * quantity): return False

        return True

    @property
    def contents(self) -> list[dict]:
        return json.loads(self.contents_json)
    
    @contents.setter
    def contents(self, value: dict[int, int]):
        self.contents_json = json.dumps(value)

    @property
    def cost(self) -> dict[int, int]:
        return { int(k): v for k, v in json.loads(self.cost_json).items() }
    
    @cost.setter
    def cost(self, value: dict[int, int]):
        self.cost_json = json.dumps(value)

    @property
    def value(self) -> dict[int, int]:
        return { int(k): v for k, v in json.loads(self.value_json).items() }
    
    @value.setter
    def value(self, value: dict[int, int]):
        self.value_json = json.dumps(value)

    @property
    def prerequisites(self) -> dict[int, int]:
        return { int(k): v for k, v in json.loads(self.prerequisites_json).items() }
    
    @prerequisites.setter
    def prerequisites(self, value: dict[int, int]):
        self.prerequisites_json = json.dumps(value)