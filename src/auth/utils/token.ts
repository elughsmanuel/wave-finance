import jwt from 'jsonwebtoken';
import { Response } from 'express';

// Function to create a JWT token - for sign up
export const createToken = (res: Response, userId: string, role: string): string => {
  const token = setToken(userId, role);

  createCookie(res, token);

  return token;
};

const setToken = (userId: string, role: string): string => {
  const secret = String(process.env.JWT_SECRET);
  const expiresIn = process.env.JWT_EXPIRES_IN;

  return jwt.sign({ userId, role }, secret, { expiresIn });
};

const createCookie = (res: Response, accessToken: string) => {
  const cookieExpiresIn = Number(process.env.JWT_COOKIE_EXPIRES_IN);

  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + cookieExpiresIn * 24 * 60 * 60 * 1000),
    secure: process.env.NODE_ENV === 'production',
  };

  res.cookie('accessToken', accessToken, cookieOptions);
};


// Function to generate a JWT token - log in
export const generateToken = (res: Response, userId: string, role: string): string => {
    const token = getToken(userId, role);
  
    getCookie(res, token);
  
    return token;
};

const getToken = (userId: string, role: string): string => {
    const secret = String(process.env.JWT_SECRET);
    const expiresIn = process.env.JWT_EXPIRES_IN;

    return jwt.sign({ userId, role }, secret, { expiresIn });
};

const getCookie = (res: Response, accessToken: string) => {
    const cookieExpiresIn = Number(process.env.JWT_COOKIE_EXPIRES_IN);
  
    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + cookieExpiresIn * 24 * 60 * 60 * 1000),
      secure: process.env.NODE_ENV === 'production',
    };
  
    res.cookie('accessToken', accessToken, cookieOptions);
};
