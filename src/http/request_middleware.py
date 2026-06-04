# Native imports
import json
# Module imports
from src.http.request_context import RequestContext
from src.http.request_services import RequestServices
# Package imports
from core import *
from src.constants import *
from src.entities import *
# Third-party imports
from fastapi import Request

async def add_context_to_request(request: Request, call_next):
    context = RequestContext()

    # Fetch dimensions
    dimensions = request.headers.get('dimensions', '[]')
    dimensions = json.loads(dimensions)
    if not isinstance(dimensions, list): raise BadRequestException()
    dimensions = [Dimension(x) for x in dimensions]
    context.dimensions = dimensions

    request.state.context = context
    request.state.services = RequestServices(context)
    return await call_next(request)