/* eslint-disable no-unused-vars */
import Debug from 'debug';

export const errorResponse = (res, status, error) => res.status(status).json({
  errors: error,
});

export const successResponse = (res, status, key, data) => res.status(status).json({
  [key]: data,
});

export const serverErrorResponse = (err, req, res, next) => res.status(err.status || 500).json({
  errors: {
    message:
      'Something went wrong, please try again or check back for a fix',
  },
});
