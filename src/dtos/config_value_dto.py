# Module imports
from .dependencies import *

class ConfigValueDto(BaseDto):
    id = DtoField()
    data_type = DtoField()
    value = DtoField()
    initial_value = DtoField(role=Role.ADMIN)
    options = DtoField(role=Role.ADMIN)
    is_secure = DtoField(role=Role.ADMIN)
    is_editable = DtoField(role=Role.ADMIN)
    description = DtoField(role=Role.ADMIN)