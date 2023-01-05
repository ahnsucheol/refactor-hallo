import express, { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import asyncWrapper from '../middlewares/asyncWrapper';

const userRouter: Router = express.Router();
const userController = new UserController();

userRouter.post('/signup', asyncWrapper(userController.signup));

export default userRouter;
