# Native imports
from datetime import date
from typing import Any
# Module imports
from core.model.model_field import ModelField
# Package imports
from core.helpers import *

class DateModelField(ModelField):
    def _deserialize(self, value: Any) -> Any:
        return date_helpers.parse(value)