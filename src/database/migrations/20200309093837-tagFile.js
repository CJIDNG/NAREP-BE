
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('TagFiles', {
    tagId: {
      allowNull: false,
      type: Sequelize.UUID,
    },
    fileId: {
      allowNull: false,
      type: Sequelize.UUID,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('TagFiles'),
};
