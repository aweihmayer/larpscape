# Module imports
from .dependencies import *

router = APIRouter()

@router.api_route('/api/users', methods=['POST'])
async def create(request: Request, response: Response):
    services: RequestServices = request.state.services
    model = await UserModel.from_request(request)
    user = services.user.create(model)
    return UserDto(user, request.state.context).serialize()