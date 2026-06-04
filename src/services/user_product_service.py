# Module imports
from .dependencies import *

class UserProductService(BaseService):
    def __init__(self, context: RequestContext | User | Role | None = None):
        super().__init__(context)
        self.user_product_dao = UserProductDao()

    def purchase(self, user: User, product: Product):
        if not self.user.is_self(user): raise UnauthorizedException()
        user_product = self.user_product_dao.fetch(user, product)
        if user_product: raise ConflictException()
        units_sold = self.user_product_dao.count_for_product(product)
        if product.is_out_of_stock(units_sold): raise ConflictException()
        # TODO purchase with provider
        self.user_product_dao.create(user, product)

    def refund(self, user: User, product: Product):
        if not self.user.is_self(user): raise UnauthorizedException()
        user_product = self.user_product_dao.fetch(user, product)
        if not user_product: raise NotFoundException()
        elif product.can_be_refunded(user_product.created_at): raise ConflictException()
        # TODO refund with provider
        user_product.soft_delete_instance()