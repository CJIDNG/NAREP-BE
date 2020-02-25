const uuid = require('uuid/v4');

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Roles',
    [
      {
        id: uuid(),
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid(),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('Roles', null, {}),
};
