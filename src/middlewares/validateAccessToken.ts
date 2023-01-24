import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../services/user.service';
import { ACCESS_TOKEN_TYPE } from '../utils/constants';
import { resMessage } from '../utils/resMessage';
import { resObject } from '../utils/resObject';
import { statusCode } from '../utils/statusCode';

const userService = new UserService();

export const validateAccessToken = async (req, res: Response, next: NextFunction) => {
  const accessToken = req.setReqTokens.accessToken;
  const { userId, ip, device } = req.setReqTokens.redisToken;
  const reqIp = req.setReqIpDevice.ip;
  const reqDevice = req.setReqIpDevice.device;

  jwt.verify(accessToken, userService.getSecret(ACCESS_TOKEN_TYPE), (err: any, decode) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        res.status(statusCode.UNAUTHORIZED).send(resObject.fail(resMessage.TOKEN_EXPIRED));
      } else {
        res
          .status(statusCode.INTERNAL_SERVER_ERROR)
          .send(resObject.fail(resMessage.INTERNAL_SERVER_ERROR));
      }
    } else {
      if (decode.userId !== userId || ip !== reqIp || device !== reqDevice) {
        res.status(statusCode.UNAUTHORIZED).send(resObject.fail(resMessage.LOGIN_FAILED));
      } else {
        next();
      }
    }
  });
};
