import { MongoError } from 'mongodb';
import { NextFunction, Request, Response } from 'express';

export const handleDatabaseErrors: (error: MongoError, req: Request, res: Response, next: NextFunction) =>
void = (error: MongoError, req: Request, res: Response, next: NextFunction): void => {
    if (error instanceof MongoError) {
        const { code, message } : MongoError = error;

        console.error(`Captured MongoError code ${code}: ${message}`);

        res.sendStatus(code);
    }
    next(error);
};

