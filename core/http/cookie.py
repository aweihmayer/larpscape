# Native imports
from typing import Any
# Third-party imports
from fastapi import Response

class Cookie:
    def __init__(self,
        name: str,
        duration: int,
        http_only: bool = False,
        path: str | None = None,
    ):
        self.name = name
        self.duration = duration
        self.is_http_only = http_only
        self.path = path

    def set(self, value: Any, response: Response):
        response.set_cookie(
            key=self.name,
            value=str(value),
            max_age=self.duration * 60,
            httponly=self.is_http_only,
            path=self.path)