import model from '../../database/models';
import { fileUpdate } from '../../helpers/updateFile';

const { File } = model;

export const updateFile = async (req, res, next) => {
  try {
    return fileUpdate(req, res, File);
  } catch (error) {
    return next(error);
  }
};
