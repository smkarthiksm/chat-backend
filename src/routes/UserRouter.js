import express from 'express';
import validate from 'express-validation';
import UserController from '../controllers/UserController';

import * as Validator from '../validators/UserValidator';

const router = express.Router();

router.post('/signup', validate(Validator.SignUpValidator), new UserController().signup);
router.post('/login', validate(Validator.LoginValidator), new UserController().login);

export default router;