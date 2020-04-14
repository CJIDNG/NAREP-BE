import { Op } from 'sequelize';
import { errorResponse, successResponse } from '../helpers/serverResponse';
import model from '../database/models';

const { User } = model;

export const updateUserRole = async (req, res, next) => {
  try {
    const {
      params: { email },
      body: { role },
    } = req;
    const foundUser = await User.findOne({
      where: {
        email,
      },
    });
    if (!foundUser) {
      return errorResponse(res, 404, { message: 'User does not exist' });
    }
    const userRole = foundUser.role;
    if (userRole === role) {
      return errorResponse(res, 409, { message: `User already ${userRole}` });
    }
    await foundUser.update(
      {
        role,
      },
      {
        where: {
          email,
        },
        returning: true,
      },
    );
    return successResponse(res, 200, 'user', { message: 'User role has been updated successfully!' });
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const {
      params: { email },
    } = req;
    const foundUser = await User.findOne({
      where: {
        email,
      },
    });
    if (!foundUser) {
      return errorResponse(res, 404, { message: 'User does not exist' });
    }
    await User.destroy(
      {
        where: {
          email,
        },
      },
    );
    return successResponse(res, 200, 'user', { message: 'User has been deleted successfully!' });
  } catch (error) {
    return next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const { user: { userEmail } } = req;
    const users = await User.findAndCountAll({
      where: { email: { [Op.not]: userEmail } },
      order: [['updatedAt', 'DESC']],
      subQuery: false,
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });
    const { rows: allUsers, count: usersCount } = users;
    return successResponse(res, 200, 'users', { usersCount, allUsers });
  } catch (error) {
    return next(error);
  }
};
