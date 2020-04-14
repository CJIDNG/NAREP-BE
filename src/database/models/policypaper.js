/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createUniqueSlug } from '../../helpers/utils';

module.exports = (sequelize, DataTypes) => {
  const PolicyPaper = sequelize.define('PolicyPaper', {
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
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    slug: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: true,
    },
    fileType: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    fileName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {});
  PolicyPaper.beforeCreate((newPolicyPaper) => {
    newPolicyPaper.slug = createUniqueSlug(newPolicyPaper.title);
  });

  PolicyPaper.associate = (models) => {
    PolicyPaper.belongsTo(models.User, {
      foreignKey: 'userId',
      target: 'id',
      as: 'user',
      onDelete: 'CASCADE',
    });
  };
  return PolicyPaper;
};
