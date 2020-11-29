module.exports = (sequelize, Sequelize) => {
  return sequelize.define('user', {
    login: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    age: {
      type: Sequelize.STRING
    },
    isdeleted: {
      type: Sequelize.BOOLEAN
    },
  })
};
