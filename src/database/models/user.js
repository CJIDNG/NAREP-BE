/* eslint-disable no-unused-vars */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
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
  User.associate = (models) => { };
  return User;
};
