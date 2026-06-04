# Package imports
from src import *
# Third-party imports
import pytest

def test_config_value():
    config = ConfigValue.create_value(ConfigId.APP_VERSION, int, 1, False, True, ['a', 'b', 'c'])
    with pytest.raises(BadRequestException):
        config.set_value('d')