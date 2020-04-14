import model from '../../database/models';
import { successResponse } from '../../helpers/serverResponse';
import { pagination } from '../../helpers/utils';
import client from '../../redis/redis';

global.appRoot = __dirname;
const {
  PolicyPaper,
} = model;


export const getPolicyPapers = async (req, res, next) => {
  try {
    const { query: { page, limit } } = req;
    const pageNumber = pagination(page, limit);
    return client.get('policyPapers', async (error, papers) => {
      if (papers) {
        const files = JSON.parse(papers);
        const { rows: allFiles, count: filesCount } = files;
        return successResponse(res, 200, 'files', { filesCount, allFiles });
      }
      const files = await PolicyPaper.findAndCountAll({
        offset: pageNumber.offset,
        limit: pageNumber.limit,
        order: [['updatedAt', 'DESC']],
        subQuery: false,
      });
      const { rows: allFiles, count: filesCount } = files;
      client.setex('policyPapers', 300, JSON.stringify({ ...files }));
      return successResponse(res, 200, 'files', { filesCount, allFiles });
    });
  } catch (error) {
    return next(error);
  }
};
