# Native imports
from datetime import datetime
from typing import Any
# Module imports
from core.model.model_field import ModelField

class DateTimeModelField(ModelField):
    def _deserialize(self, value: Any) -> Any:
        return datetime(value)