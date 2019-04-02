import * as express from 'express';
import TimesRouter from './TimesRouter';
import { IServer } from '../../interfaces/ServerInterface';
import ConceptsRouter from './ConceptsRouter';
import ProductsRouter from './ProductsRouter';

export default class Routes {
    static init(server: IServer): void {
        const router: express.Router = express.Router();
        server.app.use('/api/v1/times', TimesRouter.router);
        server.app.use('/api/v1/concepts', ConceptsRouter.router);
        server.app.use('/api/v1/products', ProductsRouter.router);

        server.app.use(router);
    }
}
