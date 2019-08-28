import express from 'express';

import UserRouter from './UserRouter';
import ChatsRouter from './ChatsRouter';

const router = express.Router();
router.use('/user', UserRouter);
router.use('/chats', ChatsRouter);
export default router;

