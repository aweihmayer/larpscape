# Native imports
from typing import Self
# Module imports
from core.exceptions import *
from core.model.model_field import ModelField
# Third-party imports
from fastapi import Request

class BaseModel:
    def __init__(self, **kwargs):
        fields = self._get_fields()
        for k, v in kwargs.items():
            assert k in fields
            setattr(self, k, v)
        if kwargs: self._complete()

    @classmethod
    async def from_request(cls, request: Request) -> Self:
        data = await request.json()
        return cls.deserialize(data)

    @classmethod
    def deserialize(cls, serialized: dict) -> Self:
        obj = cls()
        for k, v in serialized.items():
            try:
                field = cls._get_field(k)
                if not field: continue
                setattr(obj, k, field.deserialize(v))
            except:
                raise BadRequestException.field(k, v)

        obj._complete()
        return obj
    
    def _complete(self):
        for name, field in self._get_fields().items():
            value = getattr(self, name)
            if not isinstance(value, ModelField): continue
            setattr(self, name, field.default)

    @classmethod
    def _get_fields(cls) -> dict[str, ModelField]:
        fields = {}
        for x in dir(cls):
            field = getattr(cls, x)
            if not isinstance(field, ModelField): continue
            fields[x] = field

        return fields

    @classmethod
    def _get_field(cls, name: str) -> ModelField | None:
        fields = cls._get_fields()
        if name not in fields: return None
        return fields[name]

    def validate(self, condition: str | None = None):
        for name, field in self._get_fields().items():
            if field.conditions and condition and condition not in field.conditions:
                continue
            value = getattr(self, name)
            field.validate(value)

    def fill(self, obj: object, condition: str | None = None):
        for name, field in self._get_fields().items():
            if not hasattr(obj, name):
                continue
            elif field.conditions and condition and condition not in field.conditions:
                continue
            value = getattr(self, name)
            setattr(obj, name, value)