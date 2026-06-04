# Native imports
from typing import Any
# Module imports
from .dependencies import *

class ConfigService(BaseService):
    def __init__(self, context: RequestContext | User | Role | None = None):
        super().__init__(context)
        self.config_value_dao = ConfigValueDao()

    def fetch_all(self) -> list[ConfigValue]:
        if self.user.has_permissions(Role.ADMIN):
            return self.config_value_dao.fetch_all()
        else:
            return self.config_value_dao.fetch_all_unsecure()
        
    def find(self, id: ConfigId | str) -> ConfigValue:
        config = self.config_value_dao.fetch(id)
        if not config: raise NotFoundException()
        elif not config.is_secure: return config
        elif self.user.has_permissions(Role.ADMIN): return config
        raise ForbiddenException()
    
    def update(self, id: ConfigId | str, value: Any) -> ConfigValue:
        if not self.user.has_permissions(Role.ADMIN):
            raise ForbiddenException()
        config = self.find(id)
        if not config.is_editable and not self.user.has_permissions(Role.SYSTEM):
            raise BadRequestException()
        self.config_value_dao.update(config, value)
        return config
    
    def reset(self, config: ConfigValue) -> ConfigValue:
        if not self.user.has_permissions(Role.ADMIN):
            raise ForbiddenException()
        elif not config.is_editable:
            raise BadRequestException()
        else:
            return self.config_value_dao.reset(config)
    
    #region APP_VERSION
    
    @property
    def app_version(self) -> float:
        return self.find(ConfigId.APP_VERSION).float

    @app_version.setter
    def app_version(self, value: float):
        self.update(ConfigId.APP_VERSION, value)

    #endregion

    #region APP_LANG

    @property
    def app_lang(self) -> str:
        return self.find(ConfigId.APP_LANG).string

    @app_lang.setter
    def app_lang(self, value: str):
        self.update(ConfigId.APP_LANG, value)
    
    #endregion

    #region OPEN_USER_SIGNUP

    @property
    def open_user_signup(self) -> bool:
        return self.find(ConfigId.OPEN_USER_SIGNUP).boolean

    @open_user_signup.setter
    def open_user_signup(self, value: bool):
        self.update(ConfigId.OPEN_USER_SIGNUP, value)
    
    #endregion

    #region SIGNUP_REQUIRES_EMAIL_CONFIRMATION

    @property
    def signup_requires_email_confirmation(self) -> bool:
        return self.find(ConfigId.SIGNUP_REQUIRES_EMAIL_CONFIRMATION).boolean

    @signup_requires_email_confirmation.setter
    def signup_requires_email_confirmation(self, value: bool):
        self.update(ConfigId.SIGNUP_REQUIRES_EMAIL_CONFIRMATION, value)
    
    #endregion

    #region MIN_USER_AGE

    @property
    def min_user_age(self) -> int:
        return self.find(ConfigId.MIN_USER_AGE).integer

    @min_user_age.setter
    def min_user_age(self, value: int):
        self.update(ConfigId.MIN_USER_AGE, value)
    
    #endregion

    #region MAX_CHARACTERS_PER_USER

    @property
    def max_characters_per_user(self) -> int:
        return self.find(ConfigId.MAX_CHARACTERS_PER_USER).integer

    @max_characters_per_user.setter
    def max_characters_per_user(self, value: int):
        self.update(ConfigId.MAX_CHARACTERS_PER_USER, value)
    
    #endregion

    #region EMAIL_PROVIDER

    @property
    def email_provider(self) -> str:
        return self.find(ConfigId.EMAIL_PROVIDER).string

    @email_provider.setter
    def email_provider(self, value: str):
        self.update(ConfigId.EMAIL_PROVIDER, value)
    
    #endregion

    #region SYSTEM_EMAIL

    @property
    def system_email(self) -> str:
        return self.find(ConfigId.SYSTEM_EMAIL).string

    @system_email.setter
    def system_email(self, value: str):
        self.update(ConfigId.SYSTEM_EMAIL, value)
    
    #endregion

    #region RESEND_API_KEY

    @property
    def resend_api_key(self) -> str:
        return self.find(ConfigId.RESEND_API_KEY).string

    @resend_api_key.setter
    def resend_api_key(self, value: str):
        self.update(ConfigId.RESEND_API_KEY, value)
    
    #endregion

    #region PAYMENT_PROVIDER

    @property
    def payment_provider(self) -> str:
        return self.find(ConfigId.PAYMENT_PROVIDER).string

    @payment_provider.setter
    def payment_provider(self, value: str):
        self.update(ConfigId.PAYMENT_PROVIDER, value)
    
    #endregion