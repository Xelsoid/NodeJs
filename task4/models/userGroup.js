module.exports = (sequelize, Sequelize) => {
  return sequelize.define('userGroup', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
  })
};
