# Native imports
from datetime import date
# Package imports
from core import *

def test_parse_date():
    assert date_helpers.parse('2020-01-02') == date(2020, 1, 2)
    assert date_helpers.parse(None) == None
    assert date_helpers.parse('') == None

def test_date_to_string():
    assert date_helpers.to_string(date(2020, 1, 2)) == '2020-01-02'
    assert date_helpers.to_string(None) == None