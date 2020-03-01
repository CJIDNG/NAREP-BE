/* eslint-disable no-param-reassign */
import AuthHelper from '../../helpers/auth';

const { hashPassword } = AuthHelper;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    role: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['user', 'admin'],
      defaultValue: 'user',
    },
  }, {});
  User.beforeCreate(async (newUser) => {
    newUser.password = hashPassword(newUser.password);
  });
  User.associate = () => {
    // associations can be defined here
  };
  return User;
};
