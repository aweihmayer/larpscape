# Native imports
import json
# Module imports
from src.http.access_token_cookie import AccessTokenCookie
from src.http.request_context import RequestContext
from src.http.request_services import RequestServices
# Package imports
from core import *
from src.constants import *
from src.entities import *
# Third-party imports
from fastapi import Request

async def add_context_to_request(request: Request, call_next):
    from src.services import AuthService
    token = AccessTokenCookie().get(request)
    user = None
    if token: user = AuthService().fetch_user_by_token(token)
    context = RequestContext(user)

    # Fetch dimensions
    # TODO

    request.state.services = RequestServices(context)
    request.state.context = context
    return await call_next(request)