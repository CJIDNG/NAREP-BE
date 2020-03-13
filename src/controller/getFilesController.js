import { Op } from 'sequelize';

import model from '../database/models';
import { successResponse, errorResponse } from '../helpers/serverResponse';
import { pagination } from '../helpers/utils';

global.appRoot = __dirname;
const {
  File, User, Tag,
} = model;


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

export const getFileBySlug = async (req, res, next) => {
  try {
    const { params: { slug } } = req;
    const foundFile = await File.findOne({
      where: { slug },
    });
    if (!foundFile) {
      return errorResponse(res, 404, { message: 'File not found' });
    }
    const file = await File.findOne({
      order: [['updatedAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'],
        },
      ],
      where: { slug },
    });
    await File.increment({ numberOfDownload: 1 }, { where: { slug } });

    return successResponse(res, 200, 'file', file);
  } catch (error) {
    return next(error);
  }
};
