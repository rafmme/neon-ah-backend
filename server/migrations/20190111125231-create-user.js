import uuidv4 from 'uuid/v4';

export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: uuidv4()
    },
    fullName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    bio: {
      type: Sequelize.STRING
    },
    img: {
      type: Sequelize.STRING
    },
    notifySettings: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    roleId: {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: '3ceb546e-054d-4c1d-8860-e27c209d4ae3',
    },
    authTypeId: {
      type: Sequelize.UUID,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users')
};
