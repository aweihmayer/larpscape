# Module imports
from .dependencies import *

class Product(BaseEntity):
    id: int = IntegerField(primary_key=True) # type: ignore
    name: str = CharField() # type: ignore
    price: float = FloatField() # type: ignore
    refund_duration: int = IntegerField() # type: ignore
    max_sold_units: int | None = IntegerField(null=True) # type: ignore
    summary: str | None = CharField(null=True) # type: ignore
    text: str | None = TextField(null=True) # type: ignore

    def is_out_of_stock(self, units_sold: int) -> bool:
        if self.max_sold_units == None: return False
        return self.max_sold_units <= units_sold
    
    def can_be_refunded(self, date_of_purchase: datetime) -> bool:
        refund_limit = date_of_purchase + timedelta(days=self.refund_duration)
        return refund_limit >= datetime.now(timezone.utc).replace(tzinfo=None)