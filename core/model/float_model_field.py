# Native imports
from typing import Any
# Module imports
from core.model.model_field import ModelField

class FloatModelField(ModelField):
    def _deserialize(self, value: Any) -> Any:
        return float(value)