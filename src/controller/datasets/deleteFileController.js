import model from '../../database/models';
import { fileDelete } from '../../helpers/deleteFile';

const { File } = model;

export const deleteFile = async (req, res, next) => {
  try {
    return fileDelete(req, res, File);
  } catch (error) {
    return next(error);
  }
};
