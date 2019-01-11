module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Authtypes', [{
      type: 'regular',
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Authtypes', null, {});
  }
};
