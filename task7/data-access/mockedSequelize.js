const SequelizeMock = require('sequelize-mock');
const { MockedUsers, MockedGroups } = require('../mockedData');

const DBConnectionMock = new SequelizeMock();

var UserMock = DBConnectionMock.define('user', MockedUsers);
var GroupMock = DBConnectionMock.define('group', MockedGroups);

UserMock.belongsToMany(GroupMock, { through: 'UserGroup', unique: false });
GroupMock.belongsToMany(UserMock, { through: 'UserGroup', unique: false });

module.exports = {
  UserMock, GroupMock
};
