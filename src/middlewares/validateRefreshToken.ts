import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import RunTimeException from '../exceptions/RunTimeException';
import TokenReissueFailException from '../exceptions/user/TokenReissueFailException';
import { TokenRedis } from '../redis/token.redis';
import { UserService } from '../services/user.service';
import { COOKIE_NAME, REFRESH_TOKEN_TYPE } from '../utils/constants';
import { resMessage } from '../utils/resMessage';
import { resObject } from '../utils/resObject';
import { statusCode } from '../utils/statusCode';

const userService = new UserService();
const tokenRedis = new TokenRedis();

export const validateRefreshToken = async (req, res: Response, next: NextFunction) => {
  try {
    const { userId, refreshToken, ip, device } = req.setReqTokens.redisToken;

    const reqIp = req.setReqIpDevice.ip;
    const reqDevice = req.setReqIpDevice.device;

    jwt.verify(refreshToken, userService.getSecret(REFRESH_TOKEN_TYPE), (err: any, decode) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          res.clearCookie(COOKIE_NAME);
          tokenRedis.deleteToken(req.refreshTokenIndex);

          throw new TokenReissueFailException(resMessage.TOKEN_REISSUE_FAILED);
        } else {
          throw new RunTimeException(
            statusCode.INTERNAL_SERVER_ERROR,
            resMessage.INTERNAL_SERVER_ERROR,
          );
        }
      } else {
        if (decode.userId !== userId || ip !== reqIp || device !== reqDevice) {
          res.clearCookie(COOKIE_NAME);
          tokenRedis.deleteToken(req.refreshTokenIndex);

          throw new TokenReissueFailException(resMessage.TOKEN_REISSUE_FAILED);
        }
        req.userId = decode.userId;
        next();
      }
    });
  } catch (err: any) {
    console.log(err);
    res
      .status(err.code || statusCode.INTERNAL_SERVER_ERROR)
      .send(resObject.fail(err.message || resMessage.INTERNAL_SERVER_ERROR));
  }
};
