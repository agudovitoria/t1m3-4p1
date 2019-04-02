import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import { CustomResponse, IServer } from '../../interfaces/ServerInterface';
import { sendHttpErrorModule } from '../error/sendHttpError';
import { Error } from 'mongoose';
import HttpError from '../error';
import { handleDatabaseErrors, handleValidationErrors, handleCustomErrors } from './handlers/';

export default class Middleware {
    static init(server: IServer): void {
        // express middleware
        server.app.use(bodyParser.urlencoded({
            extended: false
        }));
        server.app.use(bodyParser.json());

        // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
        server.app.use(cookieParser());

        // returns the compression middleware
        server.app.use(compression());

        // helps you secure your Express apps by setting various HTTP headers
        server.app.use(helmet());

        // providing a Connect/Express middleware that can be used to enable CORS with various options
        server.app.use(cors());

        // custom errors
        server.app.use(sendHttpErrorModule);
        server.app.use(handleDatabaseErrors);
        server.app.use(handleValidationErrors);
        server.app.use(handleCustomErrors);

        // cors
        server.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With,' +
                ' Content-Type, Accept,' +
                ' Authorization,' +
                ' Access-Control-Allow-Credentials'
            );
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });

    }

    /**
     * @static
     * @param {IServer} server
     * @memberof Middleware
     */
    static initErrorHandler(server: IServer): void {
        server.app.use((error: Error, req: express.Request, res: CustomResponse) => {
            const isDevMode :boolean = server.app.get('env') === 'development';

            console.log('Catched error', error);

            if (typeof error === 'number') {
                error = new HttpError(error); // next(404)
            }

            if (error instanceof HttpError) {
                res.sendHttpError(error);
            } else {
                if (isDevMode) {
                    error = new HttpError(500, error.message);
                    res.sendHttpError(error);
                } else {
                    error = new HttpError(500);
                    res.sendHttpError(error, error.message);
                }
            }
        });
    }
}
