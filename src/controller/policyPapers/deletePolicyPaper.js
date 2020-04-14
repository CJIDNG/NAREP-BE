import model from '../../database/models';

import { deleteFile } from '../../helpers/deleteFile';

const { PolicyPaper } = model;

export const deletePolicyPaper = async (req, res, next) => {
  try {
    return deleteFile(req, res, PolicyPaper);
  } catch (error) {
    return next(error);
  }
};
