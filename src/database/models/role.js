
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    role: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['user', 'admin'],
      defaultValue: 'user',
    },
  }, {});
  Role.associate = () => {
    // associations can be defined here
  };
  return Role;
};
