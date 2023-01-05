import { statusCode } from '../../utils/statusCode';
import RunTimeException from '../RunTimeException';

class ValidateReqParamsException extends RunTimeException {
  constructor(message: string) {
    super(statusCode.BAD_REQUEST, message);
  }
}

export default ValidateReqParamsException;
