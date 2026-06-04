# Module imports
from .dependencies import *

class ProductDto(BaseDto):
    id = DtoField()
    name = DtoField()
    price = DtoField(dimension=Dimension.PRODUCT_INFO)
    refund_duration = DtoField(dimension=Dimension.PRODUCT_DETAILS)
    max_sold_units = DtoField(dimension=Dimension.PRODUCT_DETAILS)
    summary = DtoField(dimension=Dimension.PRODUCT_INFO)
    text = DtoField(dimension=Dimension.PRODUCT_DETAILS)
