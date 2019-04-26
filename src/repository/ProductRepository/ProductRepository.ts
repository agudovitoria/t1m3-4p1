import { ProductEntity } from '../../persistence/product/ProductEntity';

export interface ProductRepository {
    FindAll(): Promise<ProductEntity[]>;
    Find(id: string): Promise<ProductEntity>;
    Insert(ProductEntity: ProductEntity): Promise<ProductEntity>;
    Delete(id: string): Promise<ProductEntity>;
}
