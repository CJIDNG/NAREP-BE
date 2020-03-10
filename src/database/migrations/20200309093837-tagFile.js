/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('TagFiles', {
    tagId: {
      allowNull: false,
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Tags',
        key: 'id',
      },
    },
    fileId: {
      allowNull: false,
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Files',
        key: 'id',
      },
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('TagFiles'),
};
