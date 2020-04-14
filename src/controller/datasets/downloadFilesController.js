import { fileDownload } from '../../helpers/downloadFile';
import model from '../../database/models';

const { File } = model;

export const downloadFile = async (req, res, next) => {
  try {
    return fileDownload(req, res, File);
  } catch (error) {
    return next(error);
  }
};
