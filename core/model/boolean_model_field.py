# Native imports
from typing import Any
# Module imports
from core.model.model_field import ModelField

class BooleanModelField(ModelField):
    def _deserialize(self, value: Any) -> Any:
        return bool(value)