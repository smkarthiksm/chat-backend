import Joi from 'joi';

export const SignUpValidator = {
  body: {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.number().integer().min(1000000000).max(9999999999).required(),
    password: Joi.string().required()
  }
};

export const LoginValidator = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
};