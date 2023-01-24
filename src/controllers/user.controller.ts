import { Request, Response } from 'express';
import { LoginDto } from '../dtos/login.dto';
import { SignupDto } from '../dtos/signup.dto';
import validateReqParams from '../middlewares/validateReqParams';
import { UserService } from '../services/user.service';
import { COOKIE_NAME, COOKIE_OPTIONS } from '../utils/constants';
import { resMessage } from '../utils/resMessage';
import { resObject } from '../utils/resObject';
import { statusCode } from '../utils/statusCode';
import { IpDeviceDto } from '../dtos/IpDevice.dto';

const userService = new UserService();

export class UserController {
  async signup(req: Request, res: Response) {
    const signupDto = new SignupDto(
      req.body.nickname,
      req.body.password,
      req.body.email,
      req.body.image,
    );

    await validateReqParams(signupDto);

    const userId = await userService.signup(signupDto);
    return res
      .status(statusCode.CREATED)
      .send(resObject.success(resMessage.SIGNUP_SUCCESS, { userId }));
  }

  async login(req: Request, res: Response) {
    const loginDto = new LoginDto(req.body.email, req.body.password);

    await validateReqParams(loginDto);

    const ipDeviceDto = new IpDeviceDto(
      req['setReqIpDevice']['ip'],
      req['setReqIpDevice']['device'],
    );

    await validateReqParams(ipDeviceDto);

    const { accessToken, index } = await userService.login(loginDto, ipDeviceDto);

    res.clearCookie(COOKIE_NAME);
    res.cookie(COOKIE_NAME, index, COOKIE_OPTIONS);
    res
      .status(statusCode.CREATED)
      .send(resObject.success(resMessage.LOGIN_SUCCESS, { accessToken }));
  }

  async reissue(req: Request, res: Response) {
    const ipDeviceDto = new IpDeviceDto(
      req['setReqIpDevice']['ip'],
      req['setReqIpDevice']['device'],
    );
    await validateReqParams(ipDeviceDto);

    const userId: number = req['userId'];

    const { accessToken, index } = await userService.reissue(ipDeviceDto, userId);
    res.clearCookie(COOKIE_NAME);
    res.cookie(COOKIE_NAME, index, COOKIE_OPTIONS);
    res
      .status(statusCode.CREATED)
      .send(resObject.success(resMessage.LOGIN_SUCCESS, { accessToken }));
  }
}

/*

1. 최초 로그인: accessToken, refreshToken 생성
2. reissue (accessToken: 만료, refreshToken: 유효): 전달 받은 refreshToken, ip, device와 redis의 정보와 같은지 확인 후 accessToken 재발행 -> 이때 refreshToken도 재발행 해야할까? -> refreshToken도 재발행 결정
제외 3. (accessToken: 유효, refreshToken: 만료): 위의 과정에서 refreshToken 재발행 하면 필요 없는 고민
4. (accessToken: 만료, refreshToken: 만료): 최초 로그인 진행

서비스 이용 중 (token 둘 다 유효): 요청 할 때마다 accessToken 재발행? 또는 accessToken의 유효기간이 몇 분 이하로 남았을 때 재발행?
서비스 이용 중 (accessToken 만료 시): 2 진행 -> 클라이언트에서 요청

middleware
1. refreshToken expired 확인, ip 및 device 확인 -> 재로그인 요청
2. accessToken expired 확인 -> reissue 요청

*/
