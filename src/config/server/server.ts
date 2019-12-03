import * as express from 'express';
import Routes from '../router/routes';
import Middleware from '../middleware/middleware';

/**
 * @export
 * @class Server
 */
export class Server {
    // set server to be of type express.Application
    public app: express.Application;

    /**
     * Creates an instance of Server.
     * @memberof Server
     */
    constructor() {
        this.app = express();
        Middleware.init(this);
        Routes.init(this);
    }
}

export default new Server().app;
