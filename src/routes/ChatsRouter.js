import express from 'express';
import validate from 'express-validation';
import ChatsController from '../controllers/ChatsController';

import * as Validator from '../validators/ChatsValidator';

const router = express.Router();

router.post('/newDirectMessage', validate(Validator.NewDirectMessage), new ChatsController().createNewDirectMessage);
router.get('/getChats', new ChatsController().getChatsAssociatedWithUser);

export default router;