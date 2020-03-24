/* eslint-disable import/prefer-default-export */
import { errorResponse } from '../helpers/serverResponse';
import model from '../database/models';

const { File } = model;

export const downloadFile = async (req, res, next) => {
  try {
    const { query: { filename: fileName } } = req;

    const findFile = await File.findOne({ where: { fileName } });
    if (!findFile) {
      return errorResponse(res, 404, { message: 'File not found' });
    }
    const filepath = `${global.appRoot}/uploads/${fileName}`;

    await File.increment({ numberOfDownload: 1 }, { where: { fileName } });
    return res.download(filepath);
  } catch (error) {
    return next(error);
  }
};
