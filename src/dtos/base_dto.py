# Native imports
from typing import Any, Self
# Module imports
from .dto_field import DtoField
# Package imports
from src.http import *

class BaseDto:
    def __init__(self,
        obj: object,
        context: RequestContext,
        include_all: bool = False
    ):
        for name, field in self._get_fields().items():
            if not hasattr(obj, name): continue
            elif not include_all and not field.is_included(context): continue
            value = getattr(obj, name)
            setattr(self, name, value)

    @classmethod
    def many(cls,
        objs: list[Any],
        context: RequestContext,
        include_all: bool = False
    ) -> list[Self]:
        return [cls(x, context, include_all) for x in objs]

    def serialize(self) -> dict[str, Any]:
        serialized = {}
        for name, field in self._get_fields().items():
            value = getattr(self, name)
            if isinstance(value, DtoField): continue
            serialized[name] = value

        return serialized

    @classmethod
    def _get_fields(cls) -> dict[str, DtoField]:
        fields = {}
        for x in dir(cls):
            field = getattr(cls, x)
            if not isinstance(field, DtoField): continue
            fields[x] = field
        return fields
    
    @classmethod
    def _get_field(cls, name: str) -> DtoField | None:
        fields = cls._get_fields()
        if name not in fields: return None
        return fields[name]