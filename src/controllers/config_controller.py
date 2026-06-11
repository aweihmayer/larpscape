# Module imports
from .dependencies import *

router = APIRouter()

@router.api_route('/api/configs', methods=['GET'])
def list(request: Request):
    context: RequestContext = request.state.context
    services: RequestServices = request.state.services
    configs = services.config.fetch_all()
    return ConfigValueDto.many(configs, context)

@router.api_route('/api/configs/{id}', methods=['GET'])
def read(id: str, request: Request):
    context: RequestContext = request.state.context
    services: RequestServices = request.state.services
    config = services.config.find(id)
    return ConfigValueDto(config, context).serialize()

@router.api_route('/api/configs/{id}/reset', methods=['PATCH'])
def reset(id: str, request: Request):
    context: RequestContext = request.state.context
    services: RequestServices = request.state.services
    config = services.config.find(id)
    services.config.reset(config)
    return ConfigValueDto(config, context).serialize()

@router.api_route('/api/configs/{id}', methods=['PATCH'])
async def update(id: str, request: Request):
    context: RequestContext = request.state.context
    services: RequestServices = request.state.services
    model = await ConfigValueModel.from_request(request)
    config = services.config.find(id)
    services.config.update(config, model.value)
    return ConfigValueDto(config, context).serialize()