const { MockedUsers, MockedGroups } = require('../mockedData');
const SequelizeMock = require('sequelize-mock');
const DBConnectionMock = new SequelizeMock();

var UserMock = DBConnectionMock.define('users', MockedUsers);
var GroupMock = DBConnectionMock.define('groups', MockedGroups);

UserMock.belongsToMany(GroupMock, { through: 'UserGroup', unique: false });
GroupMock.belongsToMany(UserMock, { through: 'UserGroup', unique: false });

module.exports = {
  UserMock, GroupMock
};
