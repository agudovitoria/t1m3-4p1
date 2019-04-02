import { MongoError } from 'mongodb';
import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';

export const handleValidationErrors: (error: MongoError, req: Request, res: Response, next: NextFunction) =>
void = (error: Error, req: Request, res: Response, next: NextFunction): void => {
    if (error instanceof Error.ValidationError) {
        const { message, errors } :any = error;

        console.error(`Captured Error.ValidationError message  ${message}`, errors);

        res.sendStatus(422);
    }

    if (error instanceof Error) {
        const { message } : Error = error;

        console.error(`Captured mongo error: ${message}`);

        res.sendStatus(400);
    }

    next(error);
};

