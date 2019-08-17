import Joi from 'joi';

const SignUpValidator = {
  body: {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.number().integer().min(1000000000).max(9999999999).required(),
    gender: Joi.string().min(4).max(6).required(),
    password: Joi.string().required()
  }
};
export default SignUpValidator;