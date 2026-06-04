# Module imports
from .dependencies import *

class UserModel(BaseModel):
    id: int = IntegerModelField(conditions='never') # type: ignore
    username: str = CharModelField(conditions='create,signin') # type: ignore
    first_name: str = CharModelField(conditions='create,update') # type: ignore
    last_name: str = CharModelField(conditions='create,update') # type: ignore
    gender: Gender = EnumModelField(Gender, conditions='create,update') # type: ignore
    date_of_birth: Date = DateModelField(conditions='create,update') # type: ignore
    email: str = CharModelField(conditions='create,email') # type: ignore
    phone: int | None = IntegerModelField(conditions='create,update') # type: ignore
    password: str = CharModelField(conditions='create') # type: ignore