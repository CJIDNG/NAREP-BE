/* eslint-disable import/prefer-default-export */
import { errorResponse, successResponse } from '../helpers/serverResponse';
import model from '../database/models';
import { createFileExtension } from '../helpers/utils';

const { File } = model;

export const updateFile = async (req, res, next) => {
  try {
    const {
      params: { slug },
      user: { id },

      file,
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
    if (!file) {
      const newUpdate = {
        ...req.body,
      };
      const updatedFile = await foundFile.update(
        {
          ...newUpdate,
        },
        {
          where: {
            slug,
            userId: id,
          },
          returning: true,
        },
      );
      return successResponse(res, 200, 'file', { message: 'File has been updated successfully!', updatedFile });
    }
    const newUpdate = {
      ...req.body,
      fileType: createFileExtension(file.mimetype),
    };
    const updatedFile = await foundFile.update(
      {
        ...newUpdate,
      },
      {
        where: {
          slug,
          userId: id,
        },
        returning: true,
      },
    );
    return successResponse(res, 200, 'file', { message: 'File has been updated successfully!', updatedFile });
  } catch (error) {
    return next(error);
  }
};
