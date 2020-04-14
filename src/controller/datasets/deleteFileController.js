import model from '../../database/models';

const { File } = model;

export const deleteFile = async (req, res, next) => {
  try {
    return deleteFile(req, res, File);
  } catch (error) {
    return next(error);
  }
};
