# Native imports
from datetime import datetime, date

FORMATS = [
    '%Y-%m-%d'
]

def parse(v: str | None) -> date | None:
    if v == None or v.strip() == '': return None

    for f in FORMATS:
        try:
            return datetime.strptime(v, f).date()
        except:
            pass

    raise Exception('Invalid format')

def to_string(v: date | None) -> str | None:
    if not v: return None
    return v.strftime(FORMATS[0])