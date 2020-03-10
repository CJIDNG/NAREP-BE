/* eslint-disable no-unused-vars */

module.exports = (sequelize, DataTypes) => {
  const Sector = sequelize.define('Sector', {
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
  Sector.associate = (models) => {
    Sector.hasMany(models.File, {
      foreignKey: 'sectorId',
      as: 'sector',
      target: 'id',
      onDelete: 'CASCADE',
    });
  };
  return Sector;
};
