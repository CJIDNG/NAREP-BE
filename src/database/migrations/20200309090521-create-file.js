/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Files', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      },
    },
    slug: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    numberOfDownload: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    fileType: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fileName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sectorId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Files'),
};
