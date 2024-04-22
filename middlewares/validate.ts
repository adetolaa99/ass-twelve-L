import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const validate = (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction): void => {
 const { error } = schema.validate(req.body);
 if (error) return res.status(400).send(error.details[0].message);
 next();
};

export default validate;
