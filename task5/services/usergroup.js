const { User, Group } = require('../data-access/index');

module.exports = class UserService {
  static async addUsersToGroup (groupId, usersId) {
    const user = await User.findByPk(usersId);
    const group = await Group.findByPk(groupId);
    const result = await group.addUsers(user);

    return result ? 'userGroupAdded' : 'userGroupNotAdded';
  };
};
