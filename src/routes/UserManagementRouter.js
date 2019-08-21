import express from 'express';
import validate from 'express-validation';
import UserManagementController from '../controllers/UserManagementController';

import * as Validator from '../validators/UserValidator';

const router = express.Router();

router.post('/signup', validate(Validator.SignUpValidator), new UserManagementController().signup);
router.post('/login', validate(Validator.LoginValidator), new UserManagementController().login);

export default router;