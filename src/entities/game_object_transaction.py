# Native imports
import json
# Module imports
from .dependencies import *

class GameObjectTransaction(BaseEntity):
    int: int = IntegerField(primary_key=True) # type: ignore
    character_id: int = IntegerField() # type: ignore
    result_json: str = TextField(default='{}') # type: ignore
    max_json: str = TextField(default='{}') # type: ignore
    prerequisites_json: str = TextField(default='{}') # type: ignore

    @property
    def result(self) -> dict[int, int]:
        return { int(k): v for k, v in json.loads(self.result_json).items() }
    
    @result.setter
    def result(self, value: dict[int, int]):
        self.result_json = json.dumps(value)

    @property
    def max(self) -> dict[int, int]:
        return { int(k): v for k, v in json.loads(self.max_json).items() }
    
    @max.setter
    def max(self, value: dict[int, int]):
        self.max_json = json.dumps(value)

    @property
    def prerequisites(self) -> dict[int, int]:
        return { int(k): v for k, v in json.loads(self.prerequisites_json).items() }
    
    @prerequisites.setter
    def prerequisites(self, value: dict[int, int]):
        self.prerequisites_json = json.dumps(value)