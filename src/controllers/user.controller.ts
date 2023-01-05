import { Request, Response } from 'express';
import { SignupDto } from '../dtos/signup.dto';
import validateReqParams from '../middlewares/validateReqParams';
import { UserService } from '../services/user.service';
import { resMessage } from '../utils/resMessage';
import { resObject } from '../utils/resObject';
import { statusCode } from '../utils/statusCode';

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
}
