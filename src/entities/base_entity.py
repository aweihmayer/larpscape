# Native imports
from datetime import datetime, timezone
# Third-party imports
from peewee import TimestampField, Model, SqliteDatabase

DB = SqliteDatabase('larp.db')

class BaseEntity(Model):
    created_at: datetime = TimestampField(utc=True) # type: ignore
    updated_at: datetime = TimestampField(utc=True) # type: ignore
    deleted_at: datetime | None = TimestampField(null=True, default=None) # type: ignore

    @property
    def is_deleted(self) -> bool:
        return self.deleted_at != None
    
    def save(self, force_insert: bool = False):
        self.updated_at = datetime.now(timezone.utc)
        super().save(force_insert=force_insert)

    def soft_delete_instance(self):
        self.deleted_at = datetime.now(timezone.utc)
        self.save()

    class Meta:
        database = DB