/* eslint-disable import/prefer-default-export */
import { errorResponse } from '../helpers/serverResponse';
import model from '../database/models';

const { File } = model;

export const downloadFile = async (req, res, next) => {
  try {
    const { query: { filename } } = req;

    const findFile = await File.findOne({ where: { fileName: filename } });
    if (!findFile) {
      return errorResponse(res, 404, { message: 'File not found' });
    }
    const filepath = `${global.appRoot}/uploads/${filename}`;

    return res.download(filepath);
  } catch (error) {
    return next(error);
  }
};
