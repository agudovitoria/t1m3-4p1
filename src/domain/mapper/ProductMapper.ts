import DomainMapper from '../Domain';
import { ProductEntity } from '../../persistence/ProductEntity';
import Product from '../Product';

export class ProductMapper implements DomainMapper<Product, ProductEntity> {
  fromEntity(productEntity: ProductEntity): Product {
    const product = new Product();
    product.id = productEntity.id;
    product.name = productEntity.name;

    return product;
  }

  toEntity(domain: Product): ProductEntity {
    const productEntity = new ProductEntity();
    productEntity.id = domain.id;
    productEntity.name = domain.name;

    return productEntity;
  }

  fromRequest(request: any): Product {
    const productEntity = new ProductEntity();
    productEntity.id = request.id;
    productEntity.name = request.name;

    return productEntity;
  }

  toResponse(domain: Product): object {
    return {
      id: domain.id,
      name: domain.name,
    };
  }
}
