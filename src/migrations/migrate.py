# Module imports
from src.migrations import general_migrations
# Package imports
from src.services import *

def migrate():
    configs = ConfigService()

    general_migrations.migrate_1_0()
    configs.app_version = 1.0