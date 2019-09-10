import express from 'express';
import validate from 'express-validation';

import ChatsController from '../controllers/ChatsController';
import * as Validator from '../validators/ChatsValidator';

const router = express.Router();

router.post('/newDirectMessage', validate(Validator.NewMessageValidator), new ChatsController().createNewDirectMessage);
router.get('/getChats', new ChatsController().getChatsAssociatedWithUser);
router.get('/getChatMessages', validate(Validator.ChatIdValidator), new ChatsController().getChatMessages);
router.post('/sendMessage', validate(Validator.MessageBodyValidator), new ChatsController().insertNewMessage);
export default router;