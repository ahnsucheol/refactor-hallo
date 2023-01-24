import { LoginDto } from '../dtos/login.dto';
import { User } from '../entities/user.entity';
import { UserDao } from '../models/user.dao';
import { resMessage } from '../utils/resMessage';
import { statusCode } from '../utils/statusCode';
import validateReqParams from './validateReqParams';
import * as bcryptjs from 'bcryptjs';
import { resObject } from '../utils/resObject';
import { NextFunction, Response } from 'express';

const userDao = new UserDao();

export const validateUser = async (req, res: Response, next: NextFunction) => {
  try {
    const loginDto: LoginDto = req.body;
    await validateReqParams(loginDto);

    const user: User = await userDao.login(loginDto.email);
    if (!user) {
      res.status(statusCode.NOT_FOUND).send(resObject.fail(resMessage.NOT_FOUND));
    }
    if (!bcryptjs.compareSync(loginDto.password, user.password)) {
      res.status(statusCode.NOT_FOUND).send(resObject.fail(resMessage.BAD_REQUEST));
    }

    req.user = user;
    next();
  } catch (err: any) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(resObject.fail(err.message));
  }
};
