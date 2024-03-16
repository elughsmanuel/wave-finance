import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { 
    AUTH_TOKEN_REQUIRED,
    AUTH_TOKEN_EXPIRED,
    AUTH_TOKEN_PERMISSION,
    ADMIN,
 } from '../auth/utils/constants';

const SECRET_KEY = String(process.env.JWT_SECRET);

// Middleware to authenticate a user
export const authenticate = (
    req: Request & { user?: any}, 
    res: Response, 
    next: NextFunction,
) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            error: AUTH_TOKEN_REQUIRED,
        });
    }

    jwt.verify(token, SECRET_KEY, (err: any, decodedUser: any) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    success: false,
                    error: AUTH_TOKEN_EXPIRED,
                });
            } else {
                return res.status(StatusCodes.FORBIDDEN).json({
                    success: false,
                    error: AUTH_TOKEN_PERMISSION,
                });
            }
        }

        // Attach the decoded user information
        (req as any).user = decodedUser;

        // Attach the user ID separately
        // For authenticated requests
        (req as any).userId = decodedUser.userId;

        next();
    });
};

export const isAdmin = (
    req: Request& { user?: any}, 
    res: Response, 
    next: NextFunction,
) => {
    // Extract decoded user information
    // To retrieve the role
    const decodedUser = (req as any).user;

    if (decodedUser && decodedUser.role === ADMIN) {
        next();
    } else {
        return res.status(StatusCodes.FORBIDDEN).json({
            success: false,
            error: AUTH_TOKEN_PERMISSION,
        });
    }
};
