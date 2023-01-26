import { SignupDto } from '../dtos/signup.dto';
import EmailDuplicateException from '../exceptions/user/EmailDuplicateException';
import { resMessage } from '../utils/resMessage';
import { myDataSource } from '../configs/db.config';
import { User } from '../entities/user.entity';
import SignupFailException from '../exceptions/user/SignupFailException';
import { LoginDto } from '../dtos/login.dto';

export class UserDao {
  private userRepository = myDataSource.getRepository(User);

  async signup(signupDto: SignupDto) {
    try {
      const { email, password, nickname, image } = signupDto;

      const user = this.userRepository.create({
        email,
        password,
        nickname,
        image,
      });

      const { id } = await this.userRepository.save(user);
      return id;
    } catch (err: any) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new EmailDuplicateException(resMessage.EMAIL_CONFLICT);
      }

      throw new SignupFailException(resMessage.BAD_REQUEST);
    }
  }

  async login(email: string) {
    const user: User = await this.userRepository.findOneBy({ email });
    return user;
  }

  async findByUserId(userId: number) {
    return await this.userRepository.findOneBy({ id: userId });
  }
}
