import AuthHelper from '../helpers/auth';
import ServerResponse from '../helpers/serverResponse';
import model from '../database/models';

const { User } = model;
const { createToken } = AuthHelper;
const { errorResponse, successResponse } = ServerResponse;
/**
 *
 *
 * @export
 * @class AuthController
 */
export default class AuthController {
  /**
   *
   * @static
   *
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {function} next
   *
   * @returns {object} returns user data
   *
   * @memberof AuthController
   */
  static async signUp(req, res, next) {
    try {
      const {
        username, email, password, confirmPassword,
      } = req.body;
      const foundUser = await User.findOne({ where: { email } });
      if (foundUser) {
        return errorResponse(res, 409, { message: 'This User already exist' });
      }
      if (password !== confirmPassword) {
        return errorResponse(res, 400, { message: 'Passwords do not match' });
      }
      const user = {
        username,
        email,
        password,
      };
      const registeredUser = await User.create(user);
      const {
        id,
        email: newUserEmail,
        role,
      } = registeredUser;
      const token = createToken({
        id,
        newUserEmail,
        role,
      });
      return successResponse(res, 201, 'user', { message: 'Account has been created successfully!', token });
    } catch (error) {
      return next(error);
    }
  }
}
