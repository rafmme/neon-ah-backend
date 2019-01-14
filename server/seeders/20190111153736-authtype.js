/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Authtypes', [{
    type: 'google',
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Authtypes', null, {})
};
