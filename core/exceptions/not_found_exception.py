# Module imports
from .base_http_exception import BaseHttpException

class NotFoundException(BaseHttpException):
    def __init__(self):
        super().__init__(404)