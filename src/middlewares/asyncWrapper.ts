import { Request, Response } from 'express';
import { resObject } from '../utils/resObject';

const asyncWrapper = (fn: any) => {
  return async (req: Request, res: Response) => {
    try {
      await fn(req, res);
    } catch (err: any) {
      return res.status(err.code).send(resObject.fail(err.message));
    }
  };
};

export default asyncWrapper;
