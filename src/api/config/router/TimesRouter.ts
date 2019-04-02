import { Request, Response, NextFunction, Router } from 'express';
import TimeController from '../../controllers/TimeController';

const wrapAsync :any = (fn :Function) :Function => {
    return (req :Request, res :Response, next :NextFunction) => {
        fn(req, res, next).catch(next);
    };
};

class TimesRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.get('/', wrapAsync(TimeController.findAllForUserAndDate.bind(TimeController)));
        this.router.post('/', wrapAsync(TimeController.add.bind(TimeController)));
    }
}

export default new TimesRouter();
