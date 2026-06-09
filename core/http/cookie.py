# Native imports
from typing import Any
# Third-party imports
from fastapi import Request, Response

class Cookie:
    def __init__(self,
        name: str,
        duration: int,
        http_only: bool = False,
        secure: bool = False,
        path: str | None = None,
    ):
        self.name = name
        self.duration = duration
        self.is_http_only = http_only
        self.secure = secure
        self.path = path

    def get(self, request: Request) -> str | None:
        if self.name not in request.cookies: return None
        return request.cookies[self.name]

    def set(self, value: Any, response: Response):
        response.set_cookie(
            key=self.name,
            value=str(value),
            max_age=self.duration * 60,
            httponly=self.is_http_only,
            secure=self.secure,
            path=self.path if self.path else '/')
        
    def delete(self, response: Response):
        response.delete_cookie(
            key=self.name,
            httponly=self.is_http_only,
            secure=self.secure,
            path=self.path if self.path else '/')