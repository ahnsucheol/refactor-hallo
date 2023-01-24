import { IsIP, IsString } from 'class-validator';

export class IpDeviceDto {
  @IsIP(4)
  ip: string;

  @IsString()
  device: string;
}
