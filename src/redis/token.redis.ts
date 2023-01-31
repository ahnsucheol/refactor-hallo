import { Hmac } from 'crypto';
import { IpDeviceDto } from '../dtos/IpDevice.dto';
import RunTimeException from '../exceptions/RunTimeException';
import TokenBlackListException from '../exceptions/user/TokenBlackListException';
import TokenNotFoundException from '../exceptions/user/TokenNotFoundException';
import redisClient from '../server';
import { REFRESH_TOKEN_EXPIRATION } from '../utils/constants';
import { resMessage } from '../utils/resMessage';
import { statusCode } from '../utils/statusCode';

export class TokenRedis {
  async updateToken(index: string, userId: number, tokens, ipDeviceDto: IpDeviceDto) {
    try {
      const insertData: object = {
        userId,
        refreshToken: tokens.refreshToken,
        ip: ipDeviceDto.ip,
        device: ipDeviceDto.device,
      };

      await redisClient.v4.set(index, JSON.stringify(insertData), {
        EX: 60 * 60 * 24 * 7,
      });
    } catch (err: any) {
      console.log(err);
      throw new RunTimeException(
        statusCode.INTERNAL_SERVER_ERROR,
        resMessage.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getToken(index: string) {
    const insertedToken = JSON.parse(await redisClient.v4.get(index));

    if (!insertedToken) {
      throw new TokenNotFoundException(resMessage.TOKEN_NOT_EXIST);
    }
    return insertedToken;
  }

  async deleteToken(index: string) {
    try {
      await redisClient.v4.del(index);
    } catch (err: any) {
      throw new RunTimeException(
        statusCode.INTERNAL_SERVER_ERROR,
        resMessage.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async blacklist(
    accessToken: string,
    accessEndTime: number,
    refreshToken: string,
    refreshEndTime: number,
  ) {
    try {
      await redisClient.v4.set(accessToken, 'acc-blacklist', { EX: accessEndTime });
      await redisClient.v4.set(refreshToken, 'ref-blacklist', { EX: refreshEndTime });
    } catch (err: any) {
      throw new RunTimeException(
        statusCode.INTERNAL_SERVER_ERROR,
        resMessage.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async isBlacklistedToken(token: string) {
    try {
      const isBlacklisted = await redisClient.v4.get(token);

      if (isBlacklisted === 'acc-blacklist' || isBlacklisted === 'ref-blacklist') {
        throw new Error();
      }
    } catch (err) {
      throw new TokenBlackListException(resMessage.BLACKLIST_TOKEN);
    }
  }
}
