const { User, Group } = require('../data-access/index');
const { CommonLogger } = require('../logger');
const logger = new CommonLogger('usergroup-service', process.env.NODE_ENV);

module.exports = class UserService {
  static async addUsersToGroup (groupId, usersId) {
    const user = await User.findByPk(usersId);
    const group = await Group.findByPk(groupId);
    const result = await group.addUsers(user);
    logger.info(`createUser method invoked, ${result ? 'userGroupAdded' : 'userGroupNotAdded'}`, {groupId, usersId});
    return result ? 'userGroupAdded' : 'userGroupNotAdded';
  };
};
