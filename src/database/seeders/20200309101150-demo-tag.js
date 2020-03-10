/* eslint-disable no-unused-vars */
import { v4 as uuidv4 } from 'uuid';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Tags',
    [
      {
        id: uuidv4(),
        name: 'health',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'transport',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'water',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'road',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Tags', null, {}),
};
