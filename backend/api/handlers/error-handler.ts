import { Request, Response, NextFunction } from "express";
import {HttpError} from './errors/http-error';
import {messages} from '../../constants/messages.const';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err instanceof HttpError ? err.status : 500;
    const message = err.message || messages.SOMETHING_WENT_WRONG

    return res.status(statusCode).json({
        success: false,
        message,
    });
};

export default errorHandler;
