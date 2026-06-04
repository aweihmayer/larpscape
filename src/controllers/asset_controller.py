# Module imports
from .dependencies import *
# Package imports
from scripts import build

router = APIRouter()

REBUILD = True

@router.api_route('/assets/main.js', methods=['GET'])
def javascript():
    if REBUILD: build.build_js()
    return FileResponse(
        'src/ui/build/main.js',
        media_type='text/javascript')

@router.api_route('/assets/main.css', methods=['GET'])
def css():
    if REBUILD: build.build_css()
    return FileResponse(
        'src/ui/build/main.css',
        media_type='text/css')
