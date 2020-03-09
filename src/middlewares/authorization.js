import { decodeToken } from '../helpers/utils';
import { errorResponse } from '../helpers/serverResponse';

export const verifyAdmin = (req, res, next) => {
  try {
    const role = decodeToken(req);
    if (role !== 'admin') {
      return errorResponse(res, 403, { message: 'Only Admin can access this route' });
    }
    return next();
  } catch (error) {
    return errorResponse(res, 401, { message: 'Invalid or No token provided' });
  }
};

export const verifyUser = (req, res, next) => {
  try {
    const role = decodeToken(req);
    if (role === 'admin') {
      return errorResponse(res, 403, { message: 'Only Authenticated User can access this route' });
    }
    return next();
  } catch (error) {
    return errorResponse(res, 401, { message: 'Invalid or No token provided' });
  }
};
