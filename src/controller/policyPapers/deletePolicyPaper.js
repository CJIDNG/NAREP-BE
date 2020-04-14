import model from '../../database/models';

import { fileDelete } from '../../helpers/deleteFile';

const { PolicyPaper } = model;

export const deletePolicyPaper = async (req, res, next) => {
  try {
    return fileDelete(req, res, PolicyPaper);
  } catch (error) {
    return next(error);
  }
};
