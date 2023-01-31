import { statusCode } from '../../utils/statusCode';
import RunTimeException from '../RunTimeException';

class TokenBlackListException extends RunTimeException {
  constructor(message: string) {
    super(statusCode.BAD_REQUEST, message);
  }
}

export default TokenBlackListException;
