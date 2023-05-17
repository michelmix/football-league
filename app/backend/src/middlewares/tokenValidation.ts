import { NextFunction, Request, Response } from 'express';
import Authorization from '../utils/Authorization';

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  let auth = authorization;
  if (auth.includes('Bearer')) {
    [, auth] = auth.split(' ');
  }

  const token = new Authorization().verifyToken(auth);

  Object.defineProperty(req, 'user', { value: token });

  return next();
};
