import express from 'express';
import validate from 'express-validation';
import UserController from '../controllers/UserController';

import SignUpValidator from '../validators/SignupValidator';

const router = express.Router();

router.post('/signup', validate(SignUpValidator), new UserController().signup);

export default router;