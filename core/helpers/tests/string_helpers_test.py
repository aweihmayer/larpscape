# Package imports
from src import *

def test_is_email():
    valid = ['test@email.com', 'TEST@email.com', 'test@email.larp.com']
    for x in valid: assert string_helpers.is_email(x)

    invalid = ['test@email', 'test@']
    for x in invalid: assert not string_helpers.is_email(x)

def test_encryption():
    salt = string_helpers.create_salt()
    assert len(salt) == 10

    value = 'hello world'
    encrypted = string_helpers.encrypt(value, salt)
    assert len(encrypted) == 128

    assert string_helpers.validate_encrypted_value(value, encrypted, salt)