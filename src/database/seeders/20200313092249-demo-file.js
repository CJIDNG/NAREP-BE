/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import { createUniqueSlug } from '../../helpers/utils';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Files',
      [
        {
          id: 'ab8b9dd2-22bc-4dc2-b2dd-942a5dcb5437',
          title: 'lorem',
          description: 'lorem ipsum dolor',
          slug: 'lorem-12939933',
          userId: '5b8e15ed-2113-4e58-a533-c24d1b09d856',
          numberOfDownload: 0,
          fileType: 'png',
          fileName: '0f15239e8b1aa04c0023fc38fd790795',
          sectorId: '62fceb50-fdf1-4723-938e-4ca4bf5015f5',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Files', null, {}),
};
