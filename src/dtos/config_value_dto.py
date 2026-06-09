# Module imports
from .dependencies import *

class ConfigValueDto(BaseDto):
    id: ConfigId = DtoField() # type: ignore
    data_type: str = DtoField() # type: ignore
    value: str = DtoField() # type: ignore
    initial_value: str = DtoField(role=Role.ADMIN) # type: ignore
    options: list[str] | None = DtoField(role=Role.ADMIN) # type: ignore
    is_secret: bool = DtoField(role=Role.ADMIN) # type: ignore
    is_editable: bool = DtoField(role=Role.ADMIN) # type: ignore
