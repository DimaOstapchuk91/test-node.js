import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required,
  email: Joi.string().min(3).max(30).required,
  password: Joi.string().required,
});