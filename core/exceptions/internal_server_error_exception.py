# Module imports
from .base_http_exception import BaseHttpException

class InternalServerErrorException(BaseHttpException):
    def __init__(self):
        super().__init__(500)