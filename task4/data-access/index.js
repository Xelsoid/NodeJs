const Sequelize = require('sequelize');
const UserModel = require('../models/user');
const GroupModel = require('../models/group');
const UserGroupMTM = require('../models/userGroup');

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
const Group = GroupModel(sequelize, Sequelize);
const UserGroup = UserGroupMTM(sequelize, Sequelize);
User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });
User.hasMany(UserGroup);
Group.hasMany(UserGroup);

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  });

module.exports = {
  User, Group
};
