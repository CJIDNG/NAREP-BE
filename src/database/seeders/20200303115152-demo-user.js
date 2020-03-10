/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../../helpers/utils';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          id: '5b8e15ed-2113-4e58-a533-c24d1b09d856',
          username: 'Jand Doe',
          email: 'nareptest@admin.com',
          password: hashPassword('Password124'),
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'c3ee24b4-46ea-4b96-bad9-a114a8baf7a8',
          username: 'John Doe',
          email: 'johndoe@test.com',
          password: hashPassword('PasswoRD123__'),
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          username: 'Johnx Doe',
          email: 'johndoex@test.com',
          password: hashPassword('PasswoRD123__'),
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
