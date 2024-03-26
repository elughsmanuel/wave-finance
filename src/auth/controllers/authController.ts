import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { 
    signUpSchema, 
    loginSchema, 
    emailSchema,
    resetPasswordSchema,
} from '../../validators/schema';
import AuthService from '../services/authService';
import UserRepository from '../../user/repositories/userRepository';

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);

export const signUp = async (
    req: Request, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const schema = await signUpSchema.validateAsync(req.body);

        const signUp = await authService.signUp(
            schema.firstName,
            schema.lastName,
            schema.email,
            schema.username,
            schema.password,
            schema.confirmPassword,
            req,
            res,
        );

        return res.status(StatusCodes.CREATED).json(signUp);
    } catch (error) {
        next(error);
    }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const schema = await loginSchema.validateAsync(req.body);

        const login = await authService.login(schema.email, schema.password, res);

        return res.status(StatusCodes.OK).json(login);
    } catch (error) {
        next(error);
    }
};

export const forgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const schema = await emailSchema.validateAsync(req.body);

        const forgotPassword = await authService.forgotPassword(schema.email, req);

        return res.status(StatusCodes.OK).json(forgotPassword);
    } catch (error) {
        next(error);
    }
};

export const resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { token } = req.query;
        const schema = await resetPasswordSchema.validateAsync(req.body);

        const forgotPassword = await authService.resetPassword(
            String(schema.email),
            String(token),
            schema.password, 
            schema.confirmPassword,
        );

        return res.status(StatusCodes.OK).json(forgotPassword);
    } catch (error) {
        next(error);
    }
};
