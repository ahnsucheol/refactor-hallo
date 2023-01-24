import { NextFunction, Request, Response } from 'express';
import IP from 'ip';
import { resObject } from '../utils/resObject';
import { statusCode } from '../utils/statusCode';

const setReqIpDevice = async (req, res: Response, next: NextFunction) => {
  try {
    const ip = IP.address();
    const device = req.header('user-agent');

    const setReqIpDevice: object = { ip: ip, device: device };

    req.setReqIpDevice = setReqIpDevice;
    next();
  } catch (err: any) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(resObject.fail(err.message));
  }
};

export default setReqIpDevice;
