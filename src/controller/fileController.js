import { Op } from 'sequelize';
import fs from 'fs';
import model from '../database/models';
import { errorResponse, successResponse } from '../helpers/serverResponse';
import {
  createUniqueSlug, createFileExtension, generateTag, pagination,
} from '../helpers/utils';

global.appRoot = __dirname;
const {
  File, Sector, User, Tag,
} = model;

export const uploadFile = async (req, res, next) => {
  try {
    const {
      body:
      {
        title, description, sector, tags,
      },

      file: { filename, path, mimetype },
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

    if (tags) await generateTag(tags, createdFile.id);

    fs.rename(path, file, () => (createdFile));
    return successResponse(res, 201, 'file', { message: 'file has been created successfully!', createdFile });
  } catch (error) {
    return next(error);
  }
};

export const getFiles = async (req, res, next) => {
  try {
    const { query: { page, limit } } = req;
    const pageNumber = pagination(page, limit);
    const files = await File.findAndCountAll({
      offset: pageNumber.offset,
      limit: pageNumber.limit,
      order: [['updatedAt', 'DESC']],
      subQuery: false,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'],
        },
      ],
    });
    const { rows: allFiles, count: filesCount } = files;
    return successResponse(res, 200, 'files', { filesCount, allFiles });
  } catch (error) {
    return next(error);
  }
};

export const getFilesBySector = async (req, res, next) => {
  const { params: { sectorId }, query: { page, limit } } = req;
  try {
    const pageNumber = pagination(page, limit);
    const files = await File.findAndCountAll({
      offset: pageNumber.offset,
      limit: pageNumber.limit,
      order: [['updatedAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'],
        },
      ],
      where: { sectorId },
    });
    const { rows: allFiles, count: filesCount } = files;
    return successResponse(res, 200, 'files', { filesCount, allFiles });
  } catch (error) {
    return next(error);
  }
};

export const getFilesByTag = async (req, res, next) => {
  const { params: { id } } = req;
  try {
    const files = await Tag.findAndCountAll({
      order: [['updatedAt', 'DESC']],
      attributes: ['id', 'name'],
      include: [
        {
          model: File,
          as: 'files',
          through: { attributes: [] },
        },
      ],
      where: { id },
    });
    const { rows: allFiles, count: filesCount } = files;
    return successResponse(res, 200, 'files', { filesCount, allFiles });
  } catch (error) {
    return next(error);
  }
};

export const searchFile = async (req, res, next) => {
  const {
    query: { title, tag, author },
  } = req;
  const keyword = title || '';
  const tagValue = tag || '';
  const authorValue = author || '';

  try {
    const files = await File.findAndCountAll({
      where: {
        title: {
          [Op.iLike]: `%${keyword}%`,
        },
      },
      attributes: ['id', 'title', 'description', 'slug'],
      include: [
        {
          model: User,
          as: 'user',
          where: {
            username: {
              [Op.iLike]: `%${authorValue}%`,
            },
          },
          attributes: ['id', 'username'],
        },
        {
          model: Tag,
          as: 'tags',
          through: { attributes: [] },
          where: {
            name: {
              [Op.iLike]: `%${tagValue}%`,
            },
          },
        },
      ]
      ,
    });
    const { rows: allFiles, count: filesCount } = files;
    return successResponse(res, 200, 'files', { filesCount, allFiles });
  } catch (error) {
    return next(error);
  }
};
