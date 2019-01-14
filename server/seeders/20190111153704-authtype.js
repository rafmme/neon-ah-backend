/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Authtypes', [{
    type: 'regular',
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Authtypes', null, {})
};
