# Native imports
from datetime import datetime, timedelta
# Package imports
from src import *

def test_product():
    product = Product()

    product.max_sold_units = 10
    assert product.is_out_of_stock(11)
    assert not product.is_out_of_stock(1)

    product.refund_duration = 10
    assert product.can_be_refunded(datetime.now())
    assert not product.can_be_refunded(datetime.now() + timedelta(days=-20))