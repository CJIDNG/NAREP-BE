import { Op } from 'sequelize';

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
