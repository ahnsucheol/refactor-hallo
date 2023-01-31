import { RedisTokenDto } from './redisToken.dto';

export class TokenDto {
  accessToken: string;

  redisToken: RedisTokenDto;

  constructor(accessToken: string, redisToken: RedisTokenDto) {
    this.accessToken = accessToken;
    this.redisToken = redisToken;
  }
}
