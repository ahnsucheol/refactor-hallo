import { validate } from 'class-validator';
import ValidateReqParamsException from '../exceptions/user/ValidateReqParamsException';
import { resMessage } from '../utils/resMessage';

const validateReqParams = async (obj: any) => {
  await validate(obj).then(err => {
    if (err.length > 0) {
      throw new ValidateReqParamsException(resMessage.BAD_REQUEST);
    }
  });
};

export default validateReqParams;
