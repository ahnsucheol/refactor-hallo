import { SignupDto } from '../dtos/signup.dto';
import { UserDao } from '../models/user.dao';

const userDao = new UserDao();

export class UserService {
  async signup(signupDto: SignupDto) {
    const userId = await userDao.signup(signupDto);
    return userId;
  }
}
