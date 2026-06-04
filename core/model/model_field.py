# Native imports
from typing import Any
# Package imports
from core.exceptions import *

class ModelField:
    def __init__(self,
        data_type: Any,
        required: bool = True,
        default: Any = None,
        conditions: str = ''
    ):
        self.data_type = data_type
        self.required = required
        self.default = default
        self.conditions = conditions
    
    def deserialize(self, value: Any) -> Any:
        try: return self.data_type(value)
        except: raise Exception()

    def validate(self, value: Any):
        # Required
        if (value == None or isinstance(value, ModelField)) and self.required:
            raise BadRequestException()
        # Type
        elif not isinstance(value, self.data_type) and value != None:
            raise BadRequestException()
        
    def _validate_min_max(self, value: Any, min: Any, max: Any):
        if isinstance(value, str): value = len(value)
        if value == None: return
        elif min and value < min: raise BadRequestException()
        elif max and value > max: raise BadRequestException()