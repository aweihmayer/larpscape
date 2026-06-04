# Native imports
from typing import Any
# Module imports
from .dependencies import *

class ConfigValueDao:
    def fetch_all(self) -> list[ConfigValue]:
        return list(ConfigValue.select())
    
    def fetch_all_unsecure(self) -> list[ConfigValue]:
        return list(ConfigValue.select().where(ConfigValue.is_secure == False))
    
    def fetch(self, id: ConfigId | str) -> ConfigValue | None:
        if isinstance(id, ConfigId): id = id.value
        return ConfigValue.get_or_none(ConfigValue.id == id)
    
    def update(self, config: ConfigValue, value: Any) -> ConfigValue:
        config.set_value(value)
        config.save()
        return config
    
    def reset(self, config: ConfigValue) -> ConfigValue:
        config.reset()
        config.save()
        return config