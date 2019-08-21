import express from 'express';

import TestRouter from './TestRouter';

const router = express.Router();
router.use('/test', TestRouter);

export default router;

