# Native imports
import json
from typing import Any
# Module imports
from .dependencies import *

class ConfigValue(BaseEntity):
    id: str = CharField(primary_key=True) # type: ignore
    data_type: str = CharField() # type: ignore
    initial_value: str = CharField() # type: ignore
    value: str = CharField(null=True) # type: ignore
    options: str | None = CharField(null=True) # type: ignore
    is_secure: bool = BooleanField() # type: ignore
    is_editable: bool = BooleanField() # type: ignore

    def set_value(self, value: Any):
        if not self.options:
            self.value = value
        else:
            options = json.loads(self.options)
            if value in options: self.value = value
            else: raise BadRequestException()

    def reset(self):
        self.set_value(self.initial_value)

    @property
    def string(self) -> str:
        assert self.data_type == str.__name__
        return self.value
    
    @property
    def boolean(self) -> bool:
        assert self.data_type == bool.__name__
        return self.value.lower() == 'true'

    @property
    def float(self) -> float:
        assert self.data_type == float.__name__
        return float(self.value)

    @property
    def integer(self) -> int:
        assert self.data_type == int.__name__
        return int(self.value)
    
    @staticmethod
    def create_value(
        id: ConfigId,
        data_type: type,
        initial_value: Any,
        secure: bool = False,
        editable: bool = True,
        options: list | None = None
    ) -> 'ConfigValue':
        config = ConfigValue()
        config.id = id.value
        config.data_type = data_type.__name__
        config.initial_value = str(initial_value)
        config.value = config.initial_value
        config.is_secure = secure
        config.is_editable = editable
        config.options = json.dumps(options) if options else None
        return config
    
    @staticmethod
    def configs() -> 'list[ConfigValue]':
        return [
            ConfigValue.create_value(
                ConfigId.OPEN_USER_SIGNUP,
                bool,
                False),
            ConfigValue.create_value(
                ConfigId.SIGNUP_REQUIRES_EMAIL_CONFIRMATION,
                bool,
                False),
            ConfigValue.create_value(
                ConfigId.MIN_USER_AGE,
                int,
                0),
            ConfigValue.create_value(
                ConfigId.MAX_CHARACTERS_PER_USER,
                int,
                5),
            ConfigValue.create_value(
                ConfigId.EMAIL_PROVIDER,
                str,
                'none',
                options=['none', 'resend']),
            ConfigValue.create_value(
                ConfigId.RESEND_API_KEY,
                str,
                None,
                secure=True),
            ConfigValue.create_value(
                ConfigId.SYSTEM_EMAIL,
                str,
                'donotreply@larpscape.com'),
            ConfigValue.create_value(
                ConfigId.PAYMENT_PROVIDER,
                str,
                'none',
                options=['none', 'paypal', 'stripe']),
            ConfigValue.create_value(
                ConfigId.APP_LANG,
                str,
                'en',
                options=['en', 'fr']),
            ConfigValue.create_value(
                ConfigId.APP_VERSION,
                float,
                0.0,
                editable=False)
        ]