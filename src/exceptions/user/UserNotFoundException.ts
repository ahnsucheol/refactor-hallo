import { statusCode } from '../../utils/statusCode';
import RunTimeException from '../RunTimeException';

class UserNotFoundException extends RunTimeException {
  constructor(message: string) {
    super(statusCode.NOT_FOUND, message);
  }
}

export default UserNotFoundException;
