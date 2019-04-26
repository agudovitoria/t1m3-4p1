import { Router } from 'express';
import ConceptsController from '../../controllers/ConceptsController';

class ConceptsRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.get('/', ConceptsController.findAllForUser.bind(ConceptsController));
        this.router.post('/', ConceptsController.add.bind(ConceptsController));
    }
}

export default new ConceptsRouter();
