# Package imports
from src import *

def test_user_product_dao(seeder: EntitySeeder):
    seeder.users()
    seeder.products()
    dao = UserProductDao()

    # Create
    user = seeder.results.users[0]
    product = seeder.results.products[0]
    dao.create(user, product)
    dao.create(user, seeder.results.products[1])
    dao.create(seeder.results.users[1], product)

    # Fetch all for user
    user_products = dao.fetch_all_for_user(user)
    assert len(user_products) == 2

    # Count for user
    assert dao.count_for_user(user) == 2

    # Fetch all for product
    user_products = dao.fetch_all_for_product(product)
    assert len(user_products) == 2

    # Count for product
    assert dao.count_for_product(product) == 2

    # Fetch
    user_product = dao.fetch(user, product)
    assert user_product

    # Delete
    dao.delete(user_product)
    user_product = dao.fetch(user, product)
    assert user_product and user_product.is_deleted