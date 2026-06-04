# Package imports
from src import *

def test_event_product_dao(seeder: EntitySeeder):
    seeder.events()
    seeder.products()
    dao = EventProductDao()

    # Create
    event = seeder.results.events[0]
    product = seeder.results.products[0]
    dao.create(event, product)

    # Fetch all for event
    event_products = dao.fetch_all_for_event(event)
    assert len(event_products) == 1

    # Fetch all for product
    event_products = dao.fetch_all_for_product(product)
    assert len(event_products) == 1

    # Fetch
    event_product = dao.fetch(event, product)
    assert event_product

    # Delete
    dao.delete(event_product)
    event_product = dao.fetch(event, product)
    assert not event_product