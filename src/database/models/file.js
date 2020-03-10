/* eslint-disable no-param-reassign */
import { createUniqueSlug } from '../../helpers/utils';

module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    slug: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    numberOfDownload: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    fileType: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    fileName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    sectorId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
  }, {});
  File.beforeCreate((newFile) => {
    newFile.slug = createUniqueSlug(newFile.title);
  });

  File.associate = (models) => {
    File.belongsTo(models.User, {
      foreignKey: 'userId',
      target: 'id',
      as: 'user',
      onDelete: 'CASCADE',
    });
    File.belongsTo(models.Sector, {
      foreignKey: 'sectorId',
      as: 'sector',
      onDelete: 'CASCADE',
    });
    File.belongsToMany(models.Tag, {
      through: 'TagFiles',
      as: 'tags',
      foreignKey: 'fileId',
      onDelete: 'CASCADE',
    });
  };
  return File;
};
