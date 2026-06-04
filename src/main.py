# Package imports
from core.http import *
from src.controllers import *
from src.controllers.dependencies import *
from src.http import *
# Third-party imports
from fastapi import FastAPI

app = FastAPI()
app.middleware("http")(add_context_to_request)
app.add_exception_handler(exception_handler.BaseHttpException, exception_handler.global_exception_handler)

app.include_router(asset_controller.router)
app.include_router(auth_controller.router)
app.include_router(config_controller.router)

# Must be included last
@app.get('/{full_path:path}', response_class=HTMLResponse)
def home():
    with open('src/ui/layout/larpscape_layout.html', 'r', encoding='utf-8') as f:
        return f.read()