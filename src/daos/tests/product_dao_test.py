# Package imports
from src import *

def test_product_dao(seeder: EntitySeeder):
    dao = ProductDao()

    # Create
    model = seeder.models.products[0]
    dao.create(model)

    # Fetch all
    products = dao.fetch_all()
    assert len(products) == 1

    # Fetch
    product = dao.fetch(products[0].id)
    assert product
    
    # Update
    new_name = 'Super pass'
    model.name = new_name
    dao.update(product, model)
    product = dao.fetch(product.id)
    assert product and product.name == new_name

    # Delete
    dao.delete(product)
    product = dao.fetch(product.id)
    assert product and product.is_deleted