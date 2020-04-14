import model from '../../database/models';
import { fileDownload } from '../../helpers/downloadFile';

const { PolicyPaper } = model;

export const downloadPolicyPaper = async (req, res, next) => {
  try {
    return fileDownload(req, res, PolicyPaper);
  } catch (error) {
    return next(error);
  }
};
