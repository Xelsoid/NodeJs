const Sequelize = require('sequelize');
const UserModel = require('../models/index');

const sequelize = new Sequelize('postgres', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
    "createdAt": "createdat",
    "updatedAt": "updatedat"
  }
});

const User = UserModel(sequelize, Sequelize);
sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  });

module.exports = {
  User
};
