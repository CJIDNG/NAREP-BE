import fs from 'fs';
import model from '../../database/models';
import { errorResponse, successResponse } from '../../helpers/serverResponse';
import {
  createUniqueSlug, createFileExtension, generateTag,
} from '../../helpers/utils';

const { File, Sector } = model;

export const uploadFile = async (req, res, next) => {
  try {
    const {
      body:
      {
        title, description, sector, tags,
      },

      file: {
        path, originalname,
      },
      user: { id },
    } = req;
    const findFile = await File.findOne({ where: { title } });
    if (findFile) {
      return errorResponse(res, 409, { message: 'File with this name already exists' });
    }

    const findSector = await Sector.findOne({ where: { name: sector.toLowerCase() } });

    if (!findSector) {
      return errorResponse(res, 404, { message: 'Sector not found' });
    }

    const { id: sectorId } = findSector;
    const file = `${global.appRoot}/uploads/${originalname}`;
    const newFile = {
      title,
      description,
      fileType: createFileExtension(originalname),
      sectorId,
      userId: id,
      slug: createUniqueSlug(title),
      fileName: originalname,
    };
    const createdFile = await File.create(newFile);

    if (tags) await generateTag(tags, createdFile.id);

    fs.rename(path, file, () => (createdFile));
    return successResponse(res, 201, 'file', { message: 'file has been created successfully!', createdFile });
  } catch (error) {
    return next(error);
  }
};
