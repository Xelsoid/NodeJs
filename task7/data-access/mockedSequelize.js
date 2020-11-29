const SequelizeMock = require('sequelize-mock');
const { Model } = require('sequelize-mock');
const { MockedUsers, MockedGroups } = require('../mockedData');

const DBConnectionMock = new SequelizeMock();

var UserMock = new Model('user', MockedUsers);
var GroupMock = new Model('user', MockedGroups);

UserMock.belongsToMany(GroupMock, { through: 'UserGroup', unique: false });
GroupMock.belongsToMany(UserMock, { through: 'UserGroup', unique: false });

module.exports = {
  UserMock, GroupMock
};
