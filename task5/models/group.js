module.exports = (sequelize, Sequelize) => {
  return sequelize.define('group', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    permissions: {
      type: Sequelize.ARRAY(Sequelize.STRING),
    }
  })
};
