# Native imports
from datetime import date
# Package imports
from src.constants import *
from src.entities import *
from src.entities.base_entity import DB
from core.helpers import *

def migrate_1_0():
    DB.create_tables([
        ConfigValue,
        User,
        Token,
        Character,
        GameObject,
        GameObjectRelation,
        GameObjectTransaction,
        Product,
        UserProduct,
        Event,
        UserEvent,
        EventProduct
    ])

    ConfigValue.bulk_create(ConfigValue.configs())

    admin = User()
    admin.username = 'admin'
    admin.email = ''
    admin.first_name = ''
    admin.last_name = ''
    admin.date_of_birth = date.min
    admin.gender = Gender.UNDISCLOSED.value
    admin.phone = None
    admin.salt = string_helpers.create_salt()
    admin.password = string_helpers.encrypt('temppassword123!', admin.salt)
    admin.role = Role.SUPER_ADMIN
    admin.is_active = True
    admin.save()