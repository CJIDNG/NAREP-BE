/* eslint-disable no-unused-vars */
import { v4 as uuidv4 } from 'uuid';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Sectors',
    [
      {
        id: uuidv4(),
        name: 'Oil and Gas'.toLocaleLowerCase(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Solid Minerals'.toLocaleLowerCase(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Forest Resources'.toLocaleLowerCase(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Climate Change'.toLocaleLowerCase(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Water and Marine Resources'.toLocaleLowerCase(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Sectors', null, {}),
};
