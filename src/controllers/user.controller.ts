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
import { TokenDto } from '../dtos/token.dto';

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

    const ipDeviceDto = new IpDeviceDto(req.setReqIpDevice.ip, req.setReqIpDevice.device);

    await validateReqParams(ipDeviceDto);

    const { accessToken, index } = await userService.login(loginDto, ipDeviceDto);

    res.clearCookie(COOKIE_NAME);
    res.cookie(COOKIE_NAME, index, COOKIE_OPTIONS);
    res
      .status(statusCode.CREATED)
      .send(resObject.success(resMessage.LOGIN_SUCCESS, { accessToken }));
  }

  async reissue(req: Request, res: Response) {
    const setReqTokens = new TokenDto(req.setReqTokens.accessToken, req.setReqTokens.redisToken);
    await validateReqParams(setReqTokens);

    const ipDeviceDto = new IpDeviceDto(req.setReqIpDevice.ip, req.setReqIpDevice.device);
    await validateReqParams(ipDeviceDto);

    const userId: number = req.userId;

    const { accessToken, index } = await userService.reissue(setReqTokens, ipDeviceDto, userId);
    res.clearCookie(COOKIE_NAME);
    res.cookie(COOKIE_NAME, index, COOKIE_OPTIONS);
    res
      .status(statusCode.CREATED)
      .send(resObject.success(resMessage.TOKEN_REISSUE_SUCCESS, { accessToken }));
  }
  async logout(req: Request, res: Response) {
    const setReqTokens = req.setReqTokens;
    const refreshTokenIndex = req.refreshTokenIndex;

    await userService.logout(setReqTokens, refreshTokenIndex);
    res.cookie(COOKIE_NAME, '', COOKIE_OPTIONS);
    res.status(statusCode.OK).send(resObject.success(resMessage.LOGOUT_SUCCESS));
  }
}

/*

1. ?????? ?????????: accessToken, refreshToken ??????
2. reissue (accessToken: ??????, refreshToken: ??????): ?????? ?????? refreshToken, ip, device??? redis??? ????????? ????????? ?????? ??? accessToken ????????? -> ?????? refreshToken??? ????????? ????????????? -> refreshToken??? ????????? ??????
?????? 3. (accessToken: ??????, refreshToken: ??????): ?????? ???????????? refreshToken ????????? ?????? ?????? ?????? ??????
4. (accessToken: ??????, refreshToken: ??????): ?????? ????????? ??????

????????? ?????? ??? (token ??? ??? ??????): ?????? ??? ????????? accessToken ?????????? ?????? accessToken??? ??????????????? ??? ??? ????????? ????????? ??? ??????????
????????? ?????? ??? (accessToken ?????? ???): 2 ?????? -> ????????????????????? ??????

middleware
1. refreshToken expired ??????, ip ??? device ?????? -> ???????????? ??????
2. accessToken expired ?????? -> reissue ??????

*/
