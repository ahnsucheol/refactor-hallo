import * as express from 'express';
import { IpDeviceDto } from '../../dtos/IpDevice.dto';
import { TokenDto } from '../../dtos/token.dto';

declare global {
  namespace Express {
    interface Request {
      setReqIpDevice: IpDeviceDto;
      setReqTokens: TokenDto;
      userId: number;
      refreshTokenIndex: string;
    }
  }
}
