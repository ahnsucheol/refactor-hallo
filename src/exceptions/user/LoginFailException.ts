import { statusCode } from '../../utils/statusCode';
import RunTimeException from '../RunTimeException';

class LoginFailException extends RunTimeException {
  constructor(message: string) {
    super(statusCode.BAD_REQUEST, message);
  }
}

export default LoginFailException;
