import { Request, Response, NextFunction, Router } from 'express';
import TimeController from '../../controllers/TimeController';
import Exception from '../../exception/Exception';

const manageAsyncExceptions :any = (fn :Function) :Function =>
    (req :Request, res :Response, next :NextFunction) :void => {
        fn(req, res, next)
            .catch((exception :Exception) => {
                const { status, message } :Exception = exception;

                return res.status(status || 500).json({ message });
            });
    };

class TimesRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.get('/', manageAsyncExceptions(TimeController.findAllForUserAndDate.bind(TimeController)));
        this.router.post('/', manageAsyncExceptions(TimeController.add.bind(TimeController)));
    }
}

export default new TimesRouter();
