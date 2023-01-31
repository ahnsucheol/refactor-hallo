import { LoginDto } from '../dtos/login.dto';
import { SignupDto } from '../dtos/signup.dto';
import UserNotFoundException from '../exceptions/user/UserNotFoundException';
import { UserDao } from '../models/user.dao';
import { resMessage } from '../utils/resMessage';
import * as jwt from 'jsonWebToken';
import { User } from '../entities/user.entity';
import crypto from 'crypto';
import * as bcryptjs from 'bcryptjs';
import {
  ACCESS_TOKEN_EXPIRATION,
  ACCESS_TOKEN_TYPE,
  REFRESH_TOKEN_EXPIRATION,
  REFRESH_TOKEN_TYPE,
} from '../utils/constants';
import { IpDeviceDto } from '../dtos/IpDevice.dto';
import { TokenRedis } from '../redis/token.redis';
import { TokenDto } from '../dtos/token.dto';
import TokenExpiredException from '../exceptions/user/TokenExpiredException';

const userDao = new UserDao();
const tokenRedis = new TokenRedis();

export class UserService {
  async signup(signupDto: SignupDto) {
    const userId = await userDao.signup(signupDto);
    return userId;
  }

  async login(loginDto: LoginDto, ipDeviceDto: IpDeviceDto) {
    const user: User = await userDao.login(loginDto.email);
    if (!user) {
      throw new UserNotFoundException(resMessage.BAD_REQUEST);
    }
    if (!bcryptjs.compareSync(loginDto.password, user.password)) {
      throw new UserNotFoundException(resMessage.BAD_REQUEST);
    }
    const userId = user.id;

    const tokens = await this.getToken(userId);

    const accessToken = tokens.accessToken;

    const index: string = this.hashIndex(user.nickname);

    await tokenRedis.updateToken(index, userId, tokens, ipDeviceDto);
    return { accessToken, index };
  }

  async reissue(setReqTokens: TokenDto, ipDeviceDto: IpDeviceDto, userId: number) {
    const user: User = await userDao.findByUserId(userId);

    const accessEndTime = this.getEndTime(ACCESS_TOKEN_TYPE, setReqTokens.accessToken);
    const refreshEndTime = this.getEndTime(
      REFRESH_TOKEN_TYPE,
      setReqTokens.redisToken.refreshToken,
    );
    await tokenRedis.blacklist(
      setReqTokens.accessToken,
      accessEndTime,
      setReqTokens.redisToken.refreshToken,
      refreshEndTime,
    );

    const tokens = await this.getToken(userId);
    const accessToken = tokens.accessToken;

    const index: string = this.hashIndex(user.nickname);

    await tokenRedis.updateToken(index, userId, tokens, ipDeviceDto);
    return { accessToken, index };
  }

  async logout(setReqTokens: TokenDto, refreshTokenIndex: string) {
    const { accessToken, redisToken } = setReqTokens;

    const accessEndTime = this.getEndTime(ACCESS_TOKEN_TYPE, accessToken);
    const refreshEndTime = this.getEndTime(REFRESH_TOKEN_TYPE, redisToken.refreshToken);

    await tokenRedis.deleteToken(refreshTokenIndex);
    await tokenRedis.blacklist(accessToken, accessEndTime, redisToken.refreshToken, refreshEndTime);
  }

  private async getToken(userId: number) {
    const accessToken: string = this.createToken(ACCESS_TOKEN_TYPE, userId);
    const refreshToken: string = this.createToken(REFRESH_TOKEN_TYPE, userId);
    return { accessToken, refreshToken };
  }

  private createToken(tokenType: string, userId: number) {
    const secret: string = this.getSecret(tokenType);
    const exp: number = this.getExp(tokenType);
    return jwt.sign({ exp, userId }, secret);
  }

  getSecret(tokenType: string) {
    const accessSecert: string = process.env.ACCESS_TOKEN_SECRET_KEY;
    const refreshSecert: string = process.env.REFRESH_TOKEN_SECRET_KEY;
    if (tokenType === ACCESS_TOKEN_TYPE) {
      return accessSecert;
    }
    return refreshSecert;
  }

  private getExp(tokenType: string) {
    const accessExp: number = ACCESS_TOKEN_EXPIRATION;
    const refreshExp: number = REFRESH_TOKEN_EXPIRATION;
    if (tokenType === ACCESS_TOKEN_TYPE) {
      return accessExp;
    }
    return refreshExp;
  }

  private hashIndex(nickname: string) {
    const index: string = crypto
      .createHmac('sha256', Buffer.from(process.env.HASH_SECRET))
      .update(nickname)
      .digest('base64')
      .replace('==', '')
      .replace('=', '');

    return index;
  }

  private getEndTime(tokenType: string, token: string) {
    let endTime: number;
    jwt.verify(token, this.getSecret(tokenType), (err, decode) => {
      if (!err && typeof decode === 'object') {
        const exp: number = decode.exp;
        endTime = Math.floor((new Date(exp * 1000).getTime() - new Date().getTime()) / 1000);
      } else {
        throw new TokenExpiredException(resMessage.TOKEN_EXPIRED);
      }
    });
    return endTime;
  }

  async isBlacklistedToken(token: string) {
    await tokenRedis.isBlacklistedToken(token);
  }
}
