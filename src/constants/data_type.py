# Native imports
from enum import Enum

class DataType(Enum):
    STRING = str.__name__
    BOOLEAN = bool.__name__
    INTEGER = int.__name__
    FLOAT = float.__name__