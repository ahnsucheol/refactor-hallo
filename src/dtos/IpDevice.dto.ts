import { IsIP, IsString } from 'class-validator';

export class IpDeviceDto {
  @IsIP(4)
  ip: string;

  @IsString()
  device: string;

  constructor(ip: string, device: string) {
    this.ip = ip;
    this.device = device;
  }
}
