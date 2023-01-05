import express, { Router } from 'express';
import asyncWrapper from '../middlewares/asyncWrapper';
import userRouter from './user.route';

const router: Router = express.Router();

router.get('/ping', (_req, res) => {
  res.send('pong');
});

router.use('/user', userRouter);

export default router;
