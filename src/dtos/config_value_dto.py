# Module imports
from .dependencies import *
# Package imports
from src.http import *

class ConfigValueDto(BaseDto):
    id: ConfigId = DtoField() # type: ignore
    data_type: DataType = DtoField() # type: ignore
    value: str = DtoField() # type: ignore
    initial_value: str = DtoField(role=Role.ADMIN) # type: ignore
    options: list[str] | None = DtoField(role=Role.ADMIN, is_json=True) # type: ignore
    is_secret: bool = DtoField(role=Role.ADMIN) # type: ignore
    is_editable: bool = DtoField(role=Role.ADMIN) # type: ignore