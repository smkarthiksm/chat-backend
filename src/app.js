import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import logger from 'morgan';

import IndexRouter from './routes/IndexRouter';
import UserManagementRouter from './routes/UserManagementRouter';

import * as JWTUtility from './utilities/JWTUtility';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', UserManagementRouter);
app.use(JWTUtility.validateJWT);
app.use(IndexRouter);

app.use((err, req, res, next) => {
  res.status(err.status).send(err.message);
});

export default app;
