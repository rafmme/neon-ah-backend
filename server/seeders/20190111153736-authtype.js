module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Authtypes', [{
      type: 'facebook',
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Authtypes', null, {});
  }
};
