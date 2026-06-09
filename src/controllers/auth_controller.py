# Module imports
from .dependencies import *

router = APIRouter()

@router.api_route('/api/auth/signin', methods=['POST'])
async def signin(request: Request, response: Response):
    services: RequestServices = request.state.services
    model = await UserModel.from_request(request)
    user = services.user.find(model.username)
    access, refresh = services.auth.signin(user, model.password)
    AccessTokenCookie().set(access.id, response)
    RefreshTokenCookie().set(refresh.id, response)
    return UserDto(user, request.state.context, True).serialize()

@router.api_route('/api/auth/signout', methods=['POST'])
async def signout(request: Request, response: Response):
    AccessTokenCookie().delete(response)
    RefreshTokenCookie().delete(response)

@router.api_route('/api/auth/refresh', methods=['POST'])
async def refresh(request: Request, response: Response):
    services: RequestServices = request.state.services
    model = await UserModel.from_request(request)
    user = services.user.find(model.username)
    access, refresh = services.auth.refresh(user)
    AccessTokenCookie().set(access.id, response)
    RefreshTokenCookie().set(refresh.id, response)

@router.api_route('/api/auth/ping', methods=['GET'])
async def ping(request: Request):
    context: RequestContext = request.state.context
    return UserDto(context.user, context, True).serialize()