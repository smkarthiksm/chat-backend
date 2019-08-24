import express from 'express';
import validate from 'express-validation';
import UserController from '../controllers/UserController';

import * as Validator from '../validators/UserValidator';

const router = express.Router();

router.get('/byName', validate(Validator.NameValidator), new UserController().getByName);

export default router;