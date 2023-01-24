import { statusCode } from '../../utils/statusCode';
import RunTimeException from '../RunTimeException';

class LoginFailException extends RunTimeException {
  constructor(message: string) {
    super(statusCode.INTERNAL_SERVER_ERROR, message);
  }
}

export default LoginFailException;
