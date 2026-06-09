# Module imports
from .dependencies import *

class ProductModel(BaseModel):
    id: int = IntegerModelField(conditions=['never']) # type: ignore
    name: str = TextModelField(conditions=['create', 'update']) # type: ignore
    price: float = FloatModelField(conditions=['create', 'update']) # type: ignore
    refund_duration: int = IntegerModelField(conditions=['create', 'update']) # type: ignore
    max_sold_units: int | None = IntegerModelField(conditions=['create', 'update']) # type: ignore
    summary: str | None = TextModelField(conditions=['create', 'update']) # type: ignore
    text: str = TextModelField(conditions=['create', 'update']) # type: ignore