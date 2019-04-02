import Exception from '../../exception/Exception';
import { CustomResponse } from '../../interfaces/ServerInterface';
import { HttpError } from '../error';

export const exceptionCaptor: (req: any, res: any, next: NextFunction) => void = (req: Request, res: any, next: NextFunction): void => {
    console.error('Exception captured', exception);

    const { code, message }:any = Exception;
    const httpError:HttpError = new HttpError(code, message);
    res.sendHttpError(httpError);
};
