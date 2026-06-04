# Module imports
from .dependencies import *

class ConfigValueModel(BaseModel):
    id: ConfigId = EnumModelField(ConfigId, conditions='never') # type: ignore
    value: str = CharModelField(conditions='update') # type: ignore