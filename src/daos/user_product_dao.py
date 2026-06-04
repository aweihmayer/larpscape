# Module imports
from .dependencies import *

class UserProductDao:
    def fetch(self,
        user: User,
        product: Product
    ) -> UserProduct | None:
        return UserProduct.get_or_none(
            (UserProduct.user_id == user.id) & (UserProduct.product_id == product.id)
        )
    
    def fetch_all_for_user(self, user: User) -> list[UserProduct]:
        return list(UserProduct.select().where(UserProduct.user_id == user.id))
    
    def fetch_all_for_product(self, product: Product) -> list[UserProduct]:
        return list(UserProduct.select().where(UserProduct.product_id == product.id))

    def count_for_user(self, user: User) -> int:
        return UserProduct.select().where(UserProduct.user_id == user.id).count()
    
    def count_for_product(self, product: Product) -> int:
        return UserProduct.select().where(UserProduct.product_id == product.id).count()

    def create(self,
        user: User,
        product: Product
    ) -> UserProduct:
        user_product = UserProduct()
        user_product.user_id = user.id
        user_product.product_id = product.id
        user_product.price_paid = product.price
        user_product.save(force_insert=True)
        return user_product

    def delete(self, user_product: UserProduct):
        user_product.soft_delete_instance()