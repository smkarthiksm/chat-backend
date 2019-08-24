import Joi from 'joi';

export const NameValidator = {
  query: {
    name: Joi.string().required(),
  }
};