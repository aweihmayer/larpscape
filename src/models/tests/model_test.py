# Package imports
from src import *
# Third-party imports
import pytest

def test_model():
    serialized = { 'id': ConfigId.MAX_CHARACTERS_PER_USER, 'value': '5' }
    model = ConfigValueModel.deserialize(serialized)
    assert model.id == ConfigId.MAX_CHARACTERS_PER_USER
    assert model.value == '5'

    model.validate()
    with pytest.raises(BadRequestException):
        model.id = None
        model.validate()