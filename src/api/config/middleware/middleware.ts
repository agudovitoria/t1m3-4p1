import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';
import { IServer } from '../../interfaces/ServerInterface';

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
    }
}
