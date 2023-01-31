import express, { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import asyncWrapper from '../middlewares/asyncWrapper';
import setReqIpDevice from '../middlewares/setReqIpDevice';
import setReqTokens from '../middlewares/setReqTokens';
import { validateAccessToken } from '../middlewares/validateAccessToken';
import { validateRefreshToken } from '../middlewares/validateRefreshToken';

const userRouter: Router = express.Router();
const userController = new UserController();

userRouter.post('/signup', asyncWrapper(userController.signup));
userRouter.post('/login', setReqIpDevice, asyncWrapper(userController.login));
userRouter.post(
  '/reissue',
  setReqIpDevice,
  setReqTokens,
  validateRefreshToken,
  asyncWrapper(userController.reissue),
);
userRouter.post('/logout', setReqIpDevice, setReqTokens, asyncWrapper(userController.logout));

export default userRouter;
