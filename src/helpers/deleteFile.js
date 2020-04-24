import { errorResponse, successResponse } from './serverResponse';
import client from '../redis';

export const fileDelete = async (req, res, Model) => {
  const {
    params: { slug },
    user: { id },
  } = req;
  const foundFile = await Model.findOne({
    where: {
      slug,
      userId: id,
    },
  });
  if (!foundFile) {
    return errorResponse(res, 404, { message: 'File not found' });
  }
  await Model.destroy(
    {
      where: {
        slug,
        userId: id,
      },
    },
  );
  await client.del('foundFile');
  return successResponse(res, 200, 'file', { message: 'File has been deleted successfully!' });
};
