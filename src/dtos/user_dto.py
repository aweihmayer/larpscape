# Native imports
from datetime import date
# Module imports
from .dependencies import *

class UserDto(BaseDto):
    id: int = DtoField() # type: ignore
    username: str = DtoField() # type: ignore
    
    email: str = DtoField(dimension=Dimension.USER_PERSONAL, role=Role.MANAGER) # type: ignore
    first_name: str = DtoField(dimension=Dimension.USER_PERSONAL, role=Role.MANAGER) # type: ignore
    last_name: str = DtoField(dimension=Dimension.USER_PERSONAL, role=Role.MANAGER) # type: ignore
    date_of_birth: date = DtoField(dimension=Dimension.USER_PERSONAL, role=Role.MANAGER) # type: ignore
    gender: Gender = DtoField(dimension=Dimension.USER_PERSONAL, role=Role.MANAGER) # type: ignore
    phone: str = DtoField(dimension=Dimension.USER_PERSONAL, role=Role.MANAGER) # type: ignore

    role: Role = DtoField(dimension=Dimension.USER_PERMISSION) # type: ignore
    is_active: bool = DtoField(dimension=Dimension.USER_PERMISSION) # type: ignore