import { Router } from 'express';
import ProductsController from '../../controllers/ProductsController';

class ProductsRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.get('/', ProductsController.findAllForUser.bind(ProductsController));
        this.router.post('/', ProductsController.add.bind(ProductsController));
    }
}

export default new ProductsRouter();
