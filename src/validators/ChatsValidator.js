import Joi from 'joi';

export const NewDirectMessage = {
  body: {
    createdById: Joi.number().required(),
    ids: Joi.array().items(Joi.number()).required()
  }
};