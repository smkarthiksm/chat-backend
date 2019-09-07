import Joi from 'joi';

export const NewDirectMessage = {
  body: {
    ids: Joi.array().items(Joi.number()).min(1).required()
  }
};

export const IdValidator = {
  query: {
    id: Joi.string().required(),
  }
};