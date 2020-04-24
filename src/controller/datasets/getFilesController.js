import model from '../../database/models';
import client from '../../redis';
import { successResponse, errorResponse } from '../../helpers/serverResponse';
import { pagination } from '../../helpers/utils';
import { searchFilesResults } from '../../helpers/searchFiles';

global.appRoot = __dirname;
const {
  File, User, Tag, Sector,
} = model;


export const getFiles = async (req, res, next) => {
  try {
    const { query: { page, limit, sectorId } } = req;
    const pageNumber = pagination(page, limit);
    return client.get('files', async (error, result) => {
      if (sectorId && result) {
        return successResponse(res, 200, 'files', JSON.parse(result));
      }
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
      client.setex('files', 300, JSON.stringify({ ...files }));
      return successResponse(res, 200, 'files', { filesCount, allFiles });
    });
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
  try {
    const {
      query: {
        page, limit, searchKey,
      },
    } = req;
    const files = await searchFilesResults(page, limit, searchKey);
    const { length: filesCount } = files;
    return successResponse(res, 200, 'files', { filesCount, allFiles: files });
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
        {
          model: Tag,
          as: 'tags',
          attributes: ['id', 'name'],
        },
      ],
      where: { slug },
    });
    return successResponse(res, 200, 'file', file);
  } catch (error) {
    return next(error);
  }
};

export const getSectors = async (req, res, next) => {
  try {
    const sectors = await Sector.findAll({
      order: [['updatedAt', 'DESC']],
      subQuery: false,
      attributes: ['id', 'name'],
    });
    return successResponse(res, 200, 'sectors', sectors);
  } catch (error) {
    return next(error);
  }
};
