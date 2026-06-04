# Module imports
from .dependencies import *

class ProductDao:
    def fetch(self, id: int) -> Product | None:
        return Product.get_or_none(Product.id == id)
    
    def fetch_all(self) -> list[Product]:
        return list(Product.select())
    
    def create(self, model: ProductModel) -> Product:
        product = Product()
        return self.update(product, model)

    def update(self, product: Product, model: ProductModel) -> Product:
        model.fill(product, 'update')
        product.save()
        return product

    def delete(self, product: Product):
        product.soft_delete_instance()
        # TODO delete relations