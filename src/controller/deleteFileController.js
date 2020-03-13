/* eslint-disable import/prefer-default-export */
import { errorResponse, successResponse } from '../helpers/serverResponse';
import model from '../database/models';

const { File } = model;

export const deleteFile = async (req, res, next) => {
  try {
    const {
      params: { slug },
      user: { id },
    } = req;
    const foundFile = await File.findOne({
      where: {
        slug,
        userId: id,
      },
    });
    if (!foundFile) {
      return errorResponse(res, 404, { message: 'File not found' });
    }
    await File.destroy(
      {
        where: {
          slug,
          userId: id,
        },
      },
    );
    return successResponse(res, 200, 'file', { message: 'File has been deleted successfully!' });
  } catch (error) {
    return next(error);
  }
};
