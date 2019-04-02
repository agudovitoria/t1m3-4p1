import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';
import Exception from '../../../exception/Exception';

export const handleCustomErrors: (error: Exception, req: Request, res: Response, next: NextFunction) =>
void = (error: Error, req: Request, res: Response, next: NextFunction): void => {
    if (error instanceof Exception) {
        const { code, message } : Exception = error;

        console.error(`Captured error code ${code}: ${message}`);

        res.sendStatus(code);
    }

    next(error);
};

