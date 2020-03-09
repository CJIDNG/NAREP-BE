/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import AuthHelper from '../../helpers/auth';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      email: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM('admin', 'user'),
        values: ['admin', 'user'],
        defaultValue: 'user',
        allowNull: false,
      },
    },
    {},
  );
  User.beforeCreate(async (newUser) => {
    newUser.password = AuthHelper.hashPassword(newUser.password);
  });
  User.associate = (models) => {
    User.hasMany(models.File, {
      foreignKey: 'userId',
      target: 'id',
      onDelete: 'CASCADE',
    });
  };
  return User;
};
