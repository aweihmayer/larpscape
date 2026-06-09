# Native imports
from enum import Enum, IntEnum
from typing import Any
# Package imports
from core.exceptions import *

class ModelField:
    def __init__(self,
        required: bool = True,
        default: Any = None,
        min: Any | None = None,
        max: Any | None = None,
        options: list | type[Enum] | type[IntEnum] | None = None,
        conditions: str | list = []
    ):
        self.required = required
        self.default = default
        self.min = min
        self.max = max
        self.conditions = [conditions] if isinstance(conditions, str) else conditions

        self.options = None
        if isinstance(options, list):
            self.options = options
        elif isinstance(options, type) and issubclass(options, Enum):
            self.options = [x.value for x in options]
    
    def deserialize(self, value: Any) -> Any:
        try: return self._deserialize(value)
        except: raise BadRequestException()

    def _deserialize(self, value: Any) -> Any:
        raise NotImplementedError()

    def validate(self, value: Any):
        # Required
        if (value == None or isinstance(value, ModelField)) and self.required: raise BadRequestException()
        # Type
        self.deserialize(value)
        
    def _validate_min_max(self, value: Any):
        if isinstance(value, str): value = len(value)
        if value == None: return
        elif self.min and value < self.min: raise BadRequestException()
        elif self.max and value > self.max: raise BadRequestException()