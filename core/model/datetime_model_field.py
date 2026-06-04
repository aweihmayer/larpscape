# Native imports
from datetime import datetime
from typing import Any
# Module imports
from core.model.model_field import ModelField

class DateTimeModelField(ModelField):
    def __init__(self,
        required: bool = True,
        default: Any = None,
        conditions: str = '',
        min: datetime | None = None,
        max: datetime | None = None
    ):
        super().__init__(datetime, required, default, conditions)
        self.min = min
        self.max = max

    def validate(self, value: Any):
        super().validate(value)
        self._validate_min_max(value, self.min, self.max)