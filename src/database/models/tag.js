/* eslint-disable no-unused-vars */

module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
  }, {});
  Tag.associate = (models) => {
    Tag.belongsToMany(models.File, {
      through: 'TagFiles',
      as: 'files',
      foreignKey: 'tagId',
      onDelete: 'CASCADE',
    });
  };
  return Tag;
};
