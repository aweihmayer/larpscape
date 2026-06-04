# Native imports
from typing import Any
# Module imports
from .base_http_exception import BaseHttpException

class BadRequestException(BaseHttpException):
    def __init__(self):
        super().__init__(400)

    @staticmethod
    def field(
        field: str,
        value: Any = None
    ) -> 'BadRequestException':
        ex = BadRequestException()
        ex.content['field'] = field
        ex.content['value'] = value
        return ex