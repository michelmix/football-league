import * as jwt from 'jsonwebtoken';
import Ilogin from '../api/interfaces/ILogin';

const secret: string = process.env.JWT_SECRET || 'secret';

export const generateToken = (user: Ilogin) => jwt.sign({ user }, secret, {
  algorithm: 'HS256',
  expiresIn: '5d',
});

export const verifyToken = (token: string) => jwt.verify(token, secret);
