import { verifyToken } from '../helpers/utils';
import { errorResponse } from '../helpers/serverResponse';


export const verifyUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = verifyToken(token);
    req.user = decoded;
    return next();
  } catch (error) {
    return errorResponse(res, 401, { message: 'Invalid or No token provided' });
  }
};

export const verifyAdmin = (req, res, next) => {
  const { user: { role } } = req;
  if (role !== 'admin') {
    return errorResponse(res, 403, { message: 'Only Admin can access this route' });
  }
  return next();
};
