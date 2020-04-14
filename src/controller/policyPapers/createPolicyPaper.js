import fs from 'fs';
import model from '../../database/models';
import { errorResponse, successResponse } from '../../helpers/serverResponse';
import {
  createUniqueSlug, createFileExtension,
} from '../../helpers/utils';

const { PolicyPaper } = model;

export const createPolicyPaper = async (req, res, next) => {
  try {
    const {
      body: { title },
      file: {
        path, originalname,
      },
      user: { id },
    } = req;
    const findFile = await PolicyPaper.findOne({ where: { title } });
    if (findFile) {
      return errorResponse(res, 409, { message: 'File with this name already exists' });
    }
    const file = `${global.appRoot}/uploads/${originalname}`;
    const newFile = {
      title,
      fileType: createFileExtension(originalname),
      userId: id,
      slug: createUniqueSlug(title),
      fileName: originalname,
    };
    const createdFile = await PolicyPaper.create(newFile);

    fs.rename(path, file, () => (createdFile));
    return successResponse(res, 201, 'file', { message: 'file has been created successfully!', createdFile });
  } catch (error) {
    return next(error);
  }
};
