import { statusCode } from '../../utils/statusCode';
import RunTimeException from '../RunTimeException';

class TokenExpiredException extends RunTimeException {
  constructor(message: string) {
    super(statusCode.NOT_FOUND, message);
  }
}

export default TokenExpiredException;
