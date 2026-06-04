# Module imports
from .dependencies import *

class ProductService(BaseService):
    def __init__(self, context: RequestContext | User | Role | None = None):
        super().__init__(context)
        self.product_dao = ProductDao()

    def fetch(self, id: int) -> Product | None:
        return self.product_dao.fetch(id)
    
    def find(self, id: int) -> Product:
        product = self.fetch(id)
        if product: return product
        raise NotFoundException()
    
    def fetch_all(self) -> list[Product]:
        return self.product_dao.fetch_all()
    
    def create(self, model: ProductModel) -> Product:
        if not self.user.has_permissions(Role.MANAGER): raise ForbiddenException()
        return self.product_dao.create(model)
    
    def update(self, product: Product, model: ProductModel) -> Product:
        if not self.user.has_permissions(Role.MANAGER): raise ForbiddenException()
        return self.product_dao.update(product, model)
    
    def delete(self, product: Product):
        if not self.user.has_permissions(Role.MANAGER): raise ForbiddenException()
        self.product_dao.delete(product)
    