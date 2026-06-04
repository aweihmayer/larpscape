# Module imports
from .dependencies import *

class User(BaseEntity):
    id: int = IntegerField(primary_key=True) # type: ignore
    username: str = CharField(max_length=25) # type: ignore
    email: str = CharField() # type: ignore
    first_name: str = CharField() # type: ignore
    last_name: str = CharField() # type: ignore
    date_of_birth: date = DateField() # type: ignore
    gender: str = CharField() # type: ignore
    phone: int | None = IntegerField(null=True) # type: ignore
    password: str = CharField() # type: ignore
    salt: str = CharField() # type: ignore
    role: int = IntegerField() # type: ignore
    is_active: bool = BooleanField() # type: ignore

    def is_self(self, user: 'User | int') -> bool:
        if self.role == Role.SYSTEM.value: return True
        id = user.id if isinstance(user, User) else user
        return self.id == id
    
    def has_permissions(self, role: Role) -> bool:
        return self.role >= role.value
    
    def has_greater_permissions(self, other: 'User') -> bool:
        return self.role > other.role or self.role == Role.SYSTEM.value
    
    def is_self_or_has_greater_permissions(self, other: 'User', min: Role | None = None) -> bool:
        if self.is_self(other): return True
        elif min and not self.has_permissions(min): return False
        elif self.has_greater_permissions(other): return True
        else: return False

    @staticmethod
    def test(role: Role, id: int | None = None) -> 'User':
        user = User()
        if id: user.id = id
        user.role = role.value
        return user