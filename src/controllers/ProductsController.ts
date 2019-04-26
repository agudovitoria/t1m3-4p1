import { Request, Response } from 'express';
import NotFoundException from '../exception/NotFoundException';
import Exception from '../exception/Exception';
import { ProductRepository } from '../repository/ProductRepository/ProductRepository';
import { ProductEntity } from '../persistence/product/ProductEntity';
import Product from '../domain/Product';
import ProductRepositoryImpl from '../repository/ProductRepository/ProductMongooseRepository';

class ProductsController {
    private repository: ProductRepository;

    constructor(repository: ProductRepository) {
        this.repository = repository;
    }

    async findAllForUser(req: Request, res: Response): Promise<Response> {
        const { user, date }: any = req.query;

        console.log(`Requested times for user ${user} by date ${date}`);

        try {
            // TODO: Remove this when user be validated
            if (!user) {
                throw new NotFoundException(`User ${user} not found`);
            }

            const productEntities: ProductEntity[] = await this.repository.FindAll();
            const responseTimes: Product[] = productEntities
                .map((productEntity: ProductEntity) => new Product()
                    .fromEntity(productEntity));

            return res.status(200).json(responseTimes);
        } catch (exception) {
            const code: number = exception instanceof Exception ? exception.status : 500;
            const message: string = exception instanceof Exception ? exception.message : 'Generic exception';

            return res.status(code).json(message);
        }
    }

    async add(req: Request, res: Response): Promise<Response> {
        try {
            const { body }: any = req;
            const productToPersist: any = new Product().fromJson(body).toJson();
            const productEntity: ProductEntity = await this.repository.Insert(productToPersist);
            const product: Product = new Product().fromEntity(productEntity);

            return res.status(200).json(product);
        } catch (exception) {
            console.log('exception', exception);
            const code: number = exception instanceof Exception ? exception.status : 500;
            const message: string = exception instanceof Exception ? exception.message : 'Generic exception';

            return res.status(code).json(message);
        }
    }
}

export default new ProductsController(ProductRepositoryImpl);
