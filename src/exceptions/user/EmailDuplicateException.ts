import { statusCode } from "../../utils/statusCode";
import RunTimeException from "../RunTimeException";

class EmailDuplicateException extends RunTimeException {
  constructor(message: string) {
    super(statusCode.CONFLICT, message);
  }
}

export default EmailDuplicateException;
