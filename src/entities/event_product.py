# Native imports
import json
# Module imports
from .dependencies import *

class EventProduct(BaseEntity):
    event_id: int = IntegerField() # type: ignore
    product_id: int = IntegerField() # type: ignore

    class Meta:
        primary_key = CompositeKey('event_id', 'product_id')

