/* eslint-disable no-unused-vars */
import { v4 as uuidv4 } from 'uuid';
import AuthHelper from '../../helpers/auth';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        id: uuidv4(),
        username: 'Jand Doe',
        email: 'nareptest@admin.com',
        password: AuthHelper.hashPassword('Password124'),
        role: 'admin',
      },
      {
        id: uuidv4(),
        username: 'John Doe',
        email: 'johndoe@test.com',
        password: AuthHelper.hashPassword('PasswoRD123__'),
        role: 'user',
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
