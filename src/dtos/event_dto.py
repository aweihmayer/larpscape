# Module imports
from .dependencies import *

class EventDto(BaseDto):
    id = DtoField()
    name = DtoField()
    start = DtoField(dimension=Dimension.EVENT_INFO)
    end = DtoField(dimension=Dimension.EVENT_INFO)
    summary = DtoField(dimension=Dimension.EVENT_INFO)
    text = DtoField(dimension=Dimension.EVENT_DETAILS)
