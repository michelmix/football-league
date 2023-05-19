import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/Authorization';

async function checkToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = verifyToken(authorization);
    req.body.userToken = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}

export default checkToken;
