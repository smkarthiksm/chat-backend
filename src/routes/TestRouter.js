import express from 'express';
import validate from 'express-validation';
import Test from '../controllers/Test';

import * as Validator from '../validators/UserValidator';

const router = express.Router();

router.post('/one', new Test().signup);

export default router;