import jwt, { verify } from 'jsonwebtoken';
import { hashSync, compareSync } from 'bcryptjs';
import { config } from 'dotenv';

config();

/**
 * Handles access token generation and verification
 */
class AuthHelper {
  /**
   * @description Handles access token generation
   * @param {object} payload - The user credential {id, isAdmin}
   * @return {string} access token
   */
  static createToken(payload) {
    return jwt.sign(payload, process.env.SECRET, { expiresIn: '24H' });
  }

  /**
   * @description Handles access token verification
   * @param {string} token - The user credential {id, isAdmin}
   * @return {object} access token values
   */
  static verifyToken(token) {
    return verify(token, process.env.SECRET);
  }

  /**
   * @method hashPassword
   * @description Hashes the user inputed password
   * @param {string} password - The user password to be hashed
   * @returns {string} A string of the hashed password
   */
  static hashPassword(password) {
    return hashSync(password, 10);
  }

  /**
   * @method comparePassword
   * @description compares the user inputed password with hashPassword
   * @param {string} password - The user password to be compared
   * @param {string} hashPassword - The hashed password in the database
   * @returns {string} A hashed password
   */
  static comparePassword(password, hashPassword) {
    return compareSync(password, hashPassword);
  }
}

export default AuthHelper;