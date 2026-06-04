# Native imports
import uuid
# Module imports
from .dependencies import *
from src.entities.user import User

class Token(BaseEntity):
    id: uuid.UUID = UUIDField(primary_key=True, default=uuid.uuid4) # type: ignore
    user_id: int = IntegerField() # type: ignore
    code: int = IntegerField(null=True) # type: ignore
    duration: int = IntegerField() # type: ignore
    expiration_timestamp: datetime = TimestampField(utc=True) # type: ignore
    token_type: int = IntegerField() # type: ignore

    def refresh(self):
        self.expiration_timestamp = self.expiration_timestamp + timedelta(minutes=self.duration)

    def expire(self):
        self.expiration_timestamp = datetime.min

    @property
    def is_expired(self) -> bool:
        return self.expiration_timestamp <= datetime.now(timezone.utc).replace(tzinfo=None)