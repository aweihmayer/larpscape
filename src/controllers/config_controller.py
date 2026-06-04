# Module imports
from .dependencies import *

router = APIRouter()

@router.api_route('/api/configs', methods=['GET'])
def config_list(request: Request):
    context: RequestContext = request.state.context
    services: RequestServices = request.state.services
    configs = services.config.fetch_all()
    return ConfigValueDto.many(configs, context)

@router.api_route('/api/configs/{id}', methods=['GET'])
def config_read(id: str, request: Request):
    context: RequestContext = request.state.context
    services: RequestServices = request.state.services
    configs = services.config.find(id)
    return ConfigValueDto(configs, context).serialize()