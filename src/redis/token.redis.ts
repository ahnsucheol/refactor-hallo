import { redisClient } from '../configs/redis.config';
import { IpDeviceDto } from '../dtos/IpDevice.dto';
import RunTimeException from '../exceptions/RunTimeException';
import { REFRESH_TOKEN_EXPIRATION } from '../utils/constants';
import { resMessage } from '../utils/resMessage';
import { statusCode } from '../utils/statusCode';

const redisCli = redisClient.v4;

export class TokenRedis {
  async updateToken(index: string, userId: number, tokens, ipDeviceDto: IpDeviceDto) {
    try {
      const insertData: object = {
        userId,
        refreshToken: tokens.refreshToken,
        ip: ipDeviceDto.ip,
        device: ipDeviceDto.device,
      };

      await redisCli.set(index, JSON.stringify(insertData));
      await redisCli.expire(index, REFRESH_TOKEN_EXPIRATION);
    } catch (err: any) {
      throw new RunTimeException(
        statusCode.INTERNAL_SERVER_ERROR,
        resMessage.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getToken(index: string) {
    try {
      return JSON.parse(await redisCli.get(index));
    } catch (err) {
      throw new RunTimeException(
        statusCode.INTERNAL_SERVER_ERROR,
        resMessage.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteToken(index: string) {
    try {
      await redisCli.del(index);
    } catch (err: any) {
      throw new RunTimeException(
        statusCode.INTERNAL_SERVER_ERROR,
        resMessage.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
