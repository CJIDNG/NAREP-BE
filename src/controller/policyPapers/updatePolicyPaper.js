import model from '../../database/models';

import { fileUpdate } from '../../helpers/updateFile';

const { PolicyPaper } = model;

export const updatePolicyPaper = async (req, res, next) => {
  try {
    return fileUpdate(req, res, PolicyPaper, 'policy-paper');
  } catch (error) {
    return next(error);
  }
};
