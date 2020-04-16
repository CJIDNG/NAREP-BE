import { errorResponse, successResponse } from './serverResponse';
import { createFileExtension } from './utils';

export const fileUpdate = async (req, res, Model) => {
  const {
    params: { slug },
    user: { id },

    file,
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
  if (!file) {
    const newUpdate = {
      ...req.body,
    };
    const updatedFile = await foundFile.update(
      {
        ...newUpdate,
      },
      {
        where: {
          slug,
          userId: id,
        },
        returning: true,
      },
    );
    return successResponse(res, 200, 'file', { message: 'File has been updated successfully!', updatedFile });
  }
  const newUpdate = {
    ...req.body,
    fileType: createFileExtension(file.originalname),
  };
  const updatedFile = await foundFile.update(
    {
      ...newUpdate,
    },
    {
      where: {
        slug,
        userId: id,
      },
      returning: true,
    },
  );
  return successResponse(res, 200, 'file', { message: 'File has been updated successfully!', updatedFile });
};
