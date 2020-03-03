import AuthHelper from '../helpers/auth';
import ServerResponse from '../helpers/serverResponse';
import model from '../database/models';

const { User } = model;
const { createToken, comparePassword } = AuthHelper;
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
        return errorResponse(res, 409, { message: 'This user already exist' });
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
  static async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const foundUser = await User.findOne({ where: { email } });
      if (!foundUser) {
        return errorResponse(res, 404, { message: 'This user does not exist' });
      }
      if (!comparePassword(password, foundUser.password)) {
        return errorResponse(res, 400, { message: 'Invalid credentials' });
      }
      const {
        id,
        email: userEmail,
        role,
      } = foundUser;
      const token = createToken({
        id,
        userEmail,
        role,
      });
      return successResponse(res, 200, 'user', { message: 'User successfully logged in', token });
    } catch (error) {
      return next(error);
    }
  }
}
