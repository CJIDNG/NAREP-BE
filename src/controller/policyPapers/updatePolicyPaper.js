import model from '../../database/models';

import { updateFile } from '../../helpers/updateFile';

const { PolicyPaper } = model;

export const updatePolicyPaper = async (req, res, next) => {
  try {
    return updateFile(req, res, PolicyPaper);
  } catch (error) {
    return next(error);
  }
};
