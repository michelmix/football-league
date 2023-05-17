import { NextFunction, Request, Response } from 'express';
import { Schema, ValidationError } from 'joi';
import status from '../utils/status';

const errorHandlerFunction = (
  error: ValidationError,
  _req: Request,
  res: Response,
) => {
  const { type } = error.details[0];

  return res.status(status(type)).json({ message: error.message });
};

export default (joi: Schema, errorHandler = errorHandlerFunction) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = joi.validate(req.body);

  if (error) return errorHandler(error, req, res);

  return next();
};
