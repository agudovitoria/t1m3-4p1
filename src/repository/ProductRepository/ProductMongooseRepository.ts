/* tslint:disable:function-name */
import { ProductRepository } from './ProductRepository';
import TimeModel, { ProductEntity } from '../../persistence/ProductEntity';

class ProductMongooseRepository implements ProductRepository {
    async FindAll(): Promise<ProductEntity[]> {
        try {
            return await TimeModel.find();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async Find(id: string): Promise<ProductEntity> {
        try {
            return await TimeModel.findById(id);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async Insert(body: ProductEntity): Promise<ProductEntity> {
        try {
            return await TimeModel.create(body);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async Delete(id: string): Promise<ProductEntity> {
        try {
            return await TimeModel.remove({ _id: id });
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new ProductMongooseRepository();
