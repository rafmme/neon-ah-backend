import dotenv from 'dotenv';

dotenv.config();

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        id: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
        fullName: 'Jesse',
        userName: 'jesseinit',
        email: 'jesseinit@now.com',
        bio: 'Gitting Started',
        password: '$2y$10$z7F4f33h3XJvw/ke6ncO3uY1KdFQJb0.pcwhVh5BRgdfyc0Itlz/i',
        authTypeId: '15745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
        roleId: '3ceb546e-054d-4c1d-8860-e27c209d4ae3'
      },
      {
        id: 'aba396bd-7ac4-42c3-b442-cf10dd73e4f4',
        fullName: 'Kabir Alausa',
        userName: 'kabir',
        email: 'kabir@now.com',
        bio: 'Learning life now',
        password: '$2y$10$QCQ1uW0OWH7xKOvJ9gNWsewzoXSjvAmXw21mcZBEB52TN6T/f2Xfy',
        authTypeId: '15745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
        roleId: '3ceb546e-054d-4c1d-8860-e27c209d4ae3'
      },
      {
        id: '92745c78-7b1a-81e8-9c9c-9d42b21b1a3e',
        fullName: 'Steve',
        userName: 'steve',
        email: 'steve@now.com',
        bio: 'Gitting Started',
        password: '$2y$10$5hj02gtnG2xxYHqpkrqeXOs3kj0t3uTKUMqdKBYGeHOKRNrZdTT9O',
        authTypeId: '15745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
        roleId: '3ceb546e-054d-4c1d-8860-e27c209d4ae3'
      },
      {
        id: 'b9aef994-d8ea-4b42-88be-999d57d68891',
        fullName: process.env.SUPER_ADMIN_FULLNAME,
        userName: process.env.SUPER_ADMIN_USERNAME,
        email: process.env.SUPER_ADMIN_EMAIL,
        password: process.env.SUPER_ADMIN_PASSWORD,
        authTypeId: process.env.SUPER_ADMIN_AUTHTYPEID,
        roleId: process.env.SUPER_ADMIN_ROLE_ID,
        isVerified: true
      }
    ],
    {}
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
