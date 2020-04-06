import {
  Op, where, cast, col,
} from 'sequelize';
import { pagination } from './utils';
import models from '../database/models';

const { File, User } = models;
export const fileByTagWhere = (value) => {
  const tagWhere = {
    name: {
      [Op.iLike]: `%${value}%`,
    },
  };
  return tagWhere;
};


export const fileByTitleWhere = (value) => {
  const titleWhere = {
    title: {
      [Op.iLike]: `%${value}%`,
    },
  };
  return titleWhere;
};
export const fileBySectorWhere = (value) => {
  const sectorWhere = {
    sector: {
      [Op.iLike]: `%${value}%`,
    },
  };
  return sectorWhere;
};

export const searchFilesResults = async (page, limit, searchKey) => {
  const paginate = pagination(page, limit);
  const key = [
    where(
      cast(col('File.title'), 'varchar'),
      { [Op.iLike]: `%${searchKey}%` },
    ),
    where(
      cast(col('File.description'), 'varchar'),
      { [Op.iLike]: `%${searchKey}%` },
    ),
  ];
  const results = await File.findAll({
    where: {
      [Op.or]: key,
    },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'username'],
      },
    ],
    offset: paginate.offset,
    limit: paginate.limit,
  });

  return results;
};

export const searchUsersResults = async (page, limit, searchKey) => {
  const paginate = pagination(page, limit);
  const key = [
    where(
      cast(col('User.username'), 'varchar'),
      { [Op.iLike]: `%${searchKey}%` },
    ),
  ];
  const results = await User.findAll({
    where: {
      [Op.or]: key,
    },
    offset: paginate.offset,
    limit: paginate.limit,
  });

  return results;
};
