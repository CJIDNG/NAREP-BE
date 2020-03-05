/* eslint-disable no-unused-vars */
import Debug from 'debug';

const debug = Debug('dev');
/**
 *Server Response module
 *
 * @export
 * @class ServerResponse
 */
export default class ServerResponse {
  /**
   *Server response for an errored request
   *
   * @static
   * @param {object} res
   * @param {number} status
   * @param {object} error
   * @returns {object} error
   * @memberof ServerResponse
   */
  static errorResponse(res, status, error) {
    return res.status(status).json({
      errors: error,
    });
  }

  /**
   *Server response for a successful request
   *
   * @static
   * @param {object} res
   * @param {number} status
   *  @param {string} key
   * @param {object} data
   * @returns {object} - data
   * @memberof ServerResponse
   */
  static successResponse(res, status, key, data) {
    return res.status(status).json({
      [key]: data,
    });
  }

  /**
   *Response for a sever errror
   *
   * @static
   *
   * @param {object} err
   * @param {object} req
   * @param {object} res
   * @param {function} next
   *
   * @returns {object} errors
   *
   * @memberof ServerResponse
   */
  static serverErrorResponse(err, req, res, next) {
    /* istanbul ignore next-line */
    return res.status(err.status || 500).json({
      errors: {
        message:
          'Something went wrong, please try again or check back for a fix',
      },
    });
  }
}
