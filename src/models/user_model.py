# Module imports
from .dependencies import *

class UserModel(BaseModel):
    id: int = IntegerModelField(
        conditions=['never']
    ) # type: ignore
    username: str = TextModelField(
        min=3,
        max=25,
        conditions=['create', 'signin']
    ) # type: ignore
    first_name: str = TextModelField(
        conditions=['create', 'update']
    ) # type: ignore
    last_name: str = TextModelField(
        conditions=['create', 'update']
    ) # type: ignore
    gender: Gender = TextModelField(
        options=Gender,
        conditions=['create', 'update']
    ) # type: ignore
    date_of_birth: date = DateModelField(
        min=date(1900, 1, 1),
        conditions=['create', 'update']
    ) # type: ignore
    email: str = TextModelField(
        conditions=['create', 'email']
    ) # type: ignore
    phone: str | None = TextModelField(
        conditions=['create', 'update']
    ) # type: ignore
    password: str = TextModelField(
        conditions=['create']
    ) # type: ignore
    role: Role | None = IntegerModelField(
        options=[Role.MEMBER, Role.MEMBER_PLUS, Role.REFEREE, Role.MANAGER, Role.ADMIN, Role.SUPER_ADMIN],
        conditions=['create', 'update']
    ) # type: ignore