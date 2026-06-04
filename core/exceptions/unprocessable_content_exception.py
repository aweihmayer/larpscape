# Module imports
from .base_http_exception import BaseHttpException

class UnprocessableContentException(BaseHttpException):
    def __init__(self):
        super().__init__(422)