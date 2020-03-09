import { createUniqueSlug } from '../../helpers/utils';

module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
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
      foreignKey: true,
    },
    slug: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    numberOfDownload: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    fileType: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    sectorId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
  }, {});
  File.beforeCreate((newFile) => {
    newFile.setDataValue('slug', createUniqueSlug(newFile.title));
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
    });

    File.belongsToMany(models.Tag, {
      through: 'TagFiles',
    });
  };
  return File;
};
