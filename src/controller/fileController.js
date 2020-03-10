/* eslint-disable import/prefer-default-export */
import fs from 'fs';
import model from '../database/models';
import { errorResponse, successResponse } from '../helpers/serverResponse';
import { createUniqueSlug, createFileExtension } from '../helpers/utils';

global.appRoot = __dirname;
const {
  File, Sector,
} = model;

export const uploadFile = async (req, res, next) => {
  try {
    const {
      title, description, sector,
    } = req.body;
    const { filename, path, mimetype } = req.file;
    const { id } = req.user;
    const findFile = await File.findOne({ where: { title } });
    if (findFile) {
      return errorResponse(res, 409, { message: 'File with this name already exists' });
    }
    const findSector = await Sector.findOne({ where: { name: sector } });
    const { id: sectorId } = findSector;
    const file = `${global.appRoot}/uploads/${filename}`;
    const newFile = {
      title,
      description,
      fileType: createFileExtension(mimetype),
      sectorId,
      userId: id,
      slug: createUniqueSlug(title),
      fileName: filename,
    };
    const createdFile = await File.create(newFile);
    fs.rename(path, file, () => (createdFile));
    return successResponse(res, 201, 'file', { message: 'file has been created successfully!', createdFile });
  } catch (error) {
    return next(error);
  }
};
