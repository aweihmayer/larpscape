# Module imports
from .dependencies import *

class ConfigValueModel(BaseModel):
    id: ConfigId = TextModelField(options=ConfigId, conditions=['never']) # type: ignore
    value: str = TextModelField(conditions=['update']) # type: ignore