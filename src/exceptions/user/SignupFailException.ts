import { statusCode } from "../../utils/statusCode";
import RunTimeException from "../RunTimeException";

class SignupFailException extends RunTimeException {
  constructor(message: string) {
    super(statusCode.QUERY_ERROR, message);
  }
}

export default SignupFailException;
