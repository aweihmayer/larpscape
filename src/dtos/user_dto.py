# Module imports
from .dependencies import *

class UserDto(BaseDto):
    id = DtoField()
    username = DtoField()
    
    email = DtoField(dimension=Dimension.USER_PERSONAL, role=Role.MANAGER)
    first_name = DtoField(dimension=Dimension.USER_PERSONAL, role=Role.MANAGER)
    last_name = DtoField(dimension=Dimension.USER_PERSONAL, role=Role.MANAGER)
    date_of_birth = DtoField(dimension=Dimension.USER_PERSONAL, role=Role.MANAGER)
    gender = DtoField(dimension=Dimension.USER_PERSONAL, role=Role.MANAGER)
    phone = DtoField(dimension=Dimension.USER_PERSONAL, role=Role.MANAGER)

    role = DtoField(dimension=Dimension.USER_PERMISSION)
    is_active = DtoField(dimension=Dimension.USER_PERMISSION)