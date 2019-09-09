import Joi from 'joi';

export const NewMessageValidator = {
  body: {
    ids: Joi.array().items(Joi.number()).min(1).required()
  }
};

export const IdValidator = {
  query: {
    id: Joi.string().required(),
  }
};

export const ChatIdValidator = {
  query: {
    chatId: Joi.string().required(),
  }
};

export const MessageBodyValidator = {
  body: {
    chatId: Joi.number().integer().required(),
    message: Joi.string().required()
  }
};