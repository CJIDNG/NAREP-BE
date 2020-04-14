import model from '../../database/models';

const { File } = model;

export const updateFile = async (req, res, next) => {
  try {
    return updateFile(req, res, File);
  } catch (error) {
    return next(error);
  }
};
