# Module imports
from .dependencies import *

class UserProduct(BaseEntity):
    user_id: int = IntegerField() # type: ignore
    product_id: int = IntegerField() # type: ignore
    price_paid: float = FloatField() # type: ignore

    class Meta:
        primary_key = CompositeKey('user_id', 'product_id')