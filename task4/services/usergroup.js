const { User, Group } = require('../data-access/index');

module.exports = class UserService {
  static addUsersToGroup = (users, Group) => {
    Group.findAll().then((groups) => {
      groups.forEach((group) => {
        group.setUsers(users).then(console.log('users! added'))
      });
    });
  };
};
