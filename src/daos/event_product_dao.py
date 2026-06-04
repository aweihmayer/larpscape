# Module imports
from .dependencies import *

class EventProductDao:
    def fetch(self, event: Event, product: Product) -> EventProduct | None:
        return EventProduct.get_or_none(
            (EventProduct.event_id == event.id) & (EventProduct.product_id == product.id)
        )
    
    def fetch_all_for_event(self, event: Event) -> list[EventProduct]:
        return list(EventProduct.select().where(EventProduct.event_id == event.id))
    
    def fetch_all_for_product(self, product: Product) -> list[EventProduct]:
        return list(EventProduct.select().where(EventProduct.product_id == product.id))

    def create(self, event: Event, product: Product) -> Product:
        event_product = EventProduct()
        event_product.event_id = event.id
        event_product.product_id = product.id
        event_product.save(force_insert=True)
        return event_product

    def delete(self, event_product: EventProduct):
        event_product.delete_instance()