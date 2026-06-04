# Native imports
import hashlib
import re
import secrets
import string

def is_email(value: str) -> bool:
    if not isinstance(value, str): return False
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.fullmatch(pattern, value) is not None

def encrypt(
    value: str,
    salt: str
) -> str:
    assert salt
    value = '2!ik_p$' + value + salt
    hash_obj = hashlib.sha512(value.encode('utf-8'))
    return hash_obj.hexdigest()

def create_salt() -> str:
    alpha = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alpha) for _ in range(10))

def validate_encrypted_value(
    value: str,
    encrypted: str,
    salt: str
) -> bool:
    return encrypt(value, salt) == encrypted

def format_to_regex(format: str) -> str:
    # Escape dots
    pattern = re.escape(format)
    # Convert {placeholders}
    return re.sub(r'\\{(\w+)\\}', r'(?P<\1>[^/]+)', pattern)