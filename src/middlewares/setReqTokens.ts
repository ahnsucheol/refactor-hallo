import { NextFunction, Request, Response } from 'express';
import TokenNotFoundException from '../exceptions/user/TokenNotFoundException';
import { TokenRedis } from '../redis/token.redis';
import { COOKIE_NAME } from '../utils/constants';
import { resMessage } from '../utils/resMessage';
import { resObject } from '../utils/resObject';
import { statusCode } from '../utils/statusCode';

const tokenRedis = new TokenRedis();

const setReqTokens = async (req, res: Response, next: NextFunction) => {
  try {
    const authToken: string = req.headers.authorization || '';
    const cookieToken: string = req.headers.cookie || req.cookies.Refresh_Token_Index || '';
    if (!(authToken && cookieToken)) {
      throw new TokenNotFoundException(resMessage.TOKEN_NOT_EXIST);
    }
    const accessToken: string = authToken.split('Bearer ')[1] || '';
    const refreshTokenIndex = cookieToken.split(COOKIE_NAME + '=')[1] || '';

    if (!(accessToken && refreshTokenIndex)) {
      throw new TokenNotFoundException(resMessage.TOKEN_NOT_EXIST);
    }
    const redisToken: object = await tokenRedis.getToken(refreshTokenIndex);

    const setReqTokens = { accessToken, redisToken };

    req.setReqTokens = setReqTokens;
    req.refreshTokenIndex = refreshTokenIndex;
    next();
  } catch (err: any) {
    console.log(err);
    res
      .status(err.code || statusCode.INTERNAL_SERVER_ERROR)
      .send(resObject.fail(err.message || resMessage.INTERNAL_SERVER_ERROR));
  }
};

export default setReqTokens;
