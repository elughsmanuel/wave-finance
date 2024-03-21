import { Request, Response, NextFunction } from 'express'; 
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import Unauthenticated from '../errors/Unauthenticated';
import BadRequest from '../errors/BadRequest';
import UnprocessableEntity from '../errors/UnprocessableEntity';
import { logger } from '../log/logger';

export const errorMiddleware = (
    err: any, 
    req: Request, 
    res: Response, 
    next: NextFunction,
) => {
    if (err instanceof Unauthenticated) {
        return res.status(err.statusCode).json({
            success: false,
            data: err.message,
        });
    }

    if (err instanceof BadRequest) {
        return res.status(err.statusCode).json({
            success: false,
            data: err.message,
        });
    }

    if (err instanceof UnprocessableEntity) {
        return res.status(err.statusCode).json({
            success: false,
            data: err.message,
        });
    }

    // Handle input/Joi validation errors
    if (err instanceof Joi.ValidationError) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            success: false,
            data: err.details[0].message,
        });
    }

    // Handle errors in development by logging the stack
    if (process.env.NODE_ENV === 'development') {
        logger.error(err.message);
        logger.error(err.stack);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: err.message,
            stack: err.stack,
        });
    }

    // Handle errors in production by sending a generic error message
    else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Something went wrong.',
        });
    }
};
