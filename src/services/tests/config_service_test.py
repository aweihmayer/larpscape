# Package imports
from src import *
# Third-party imports
import pytest

def test_config_service():
    member_service = ConfigService(Role.MEMBER)
    admin_service = ConfigService(Role.ADMIN)

    # App version
    assert admin_service.app_version != 0.0

    # Update uneditable
    with pytest.raises(BadRequestException):
        admin_service.app_version = 2.0

    # Find forbidden secured
    with pytest.raises(ForbiddenException):
        member_service.find(ConfigId.RESEND_API_KEY)

    # Fetch all unsecure
    assert ConfigId.RESEND_API_KEY not in [ConfigId(x.id) for x in member_service.fetch_all()]