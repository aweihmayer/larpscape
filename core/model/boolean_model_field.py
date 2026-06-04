# Native imports
from typing import Any
# Module imports
from core.model.model_field import ModelField

class BooleanModelField(ModelField):
    def __init__(self,
        required: bool = True,
        default: Any = None,
        conditions: str = ''
    ):
        super().__init__(bool, required, default, conditions)