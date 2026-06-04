# Native imports
import os
# Package imports
from src import *
from src.migrations.migrate import migrate
# Third-party imports
import pytest

#region Fixtures

@pytest.fixture(autouse=True)
def setup_and_teardown():
    if not DB.is_closed(): DB.close()
    # Code before each test
    if os.path.exists('larp.db'): os.remove('larp.db')
    DB.connect()
    migrate()
    # Test runs here
    yield
    # Code after each test
    DB.close()

@pytest.fixture(scope='function')
def configs():
    return ConfigService()

@pytest.fixture(scope='function')
def seeder():
    seeder = EntitySeeder()
    return seeder

#endregion

#region Events

def pytest_sessionstart(session):
    pass

def pytest_sessionfinish(session, exitstatus):
    pass

#endregion