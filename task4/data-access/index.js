const Sequelize = require('sequelize');
const UserModel = require('../models/user');
const GroupModel = require('../models/group');
const { MockedUsers, MockedGroups } = require('../mockedData');
const UserService = require('../services/usergroup');

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
User.belongsToMany(Group, { through: 'UserGroup', unique: false });
Group.belongsToMany(User, { through: 'UserGroup', unique: false });

sequelize.sync({ force: true }).then(async () => {
  await sequelize.transaction(async (t) => {
    return Group.create(MockedGroups, {transaction: t});
  });

  await sequelize.transaction(async (t) => {
    return User.bulkCreate(MockedUsers, {transaction: t});
  }).then((users) => {UserService.addUsersToGroup(users, Group)});
});

module.exports = {
  User, Group
};
