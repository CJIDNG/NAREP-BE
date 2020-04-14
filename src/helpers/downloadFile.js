import { errorResponse } from './serverResponse';

export const fileDownload = async (req, res, Model) => {
  const { query: { id } } = req;

  const findFile = await Model.findOne({ where: { id } });
  if (!findFile) {
    return errorResponse(res, 404, { message: 'File not found' });
  }
  const { fileName, numberOfDownload } = findFile;
  const filepath = `${global.appRoot}/uploads/${fileName}`;
  if (numberOfDownload) {
    await Model.increment({ numberOfDownload: 1 }, { where: { id } });
  }
  return res.download(filepath);
};
