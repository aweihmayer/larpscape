# Package imports
from core.exceptions.base_http_exception import BaseHttpException
# Third-party imports
from fastapi import Request
from fastapi.responses import JSONResponse

async def global_exception_handler(request: Request, ex: Exception):
    if not isinstance(ex, BaseHttpException):
        return JSONResponse(status_code=500, content={})
    else:
        return JSONResponse(status_code=ex.code, content=ex.content)