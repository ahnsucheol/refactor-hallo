import { statusCode } from '../utils/statusCode';

class RunTimeException extends Error {
  code = statusCode.INTERNAL_SERVER_ERROR;
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

export default RunTimeException;
