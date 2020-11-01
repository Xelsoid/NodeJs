const uuid = require('uuid');
const { Group } = require('../data-access/index');
const { CommonLogger } = require('../logger');
const logger = new CommonLogger('group-service', process.env.NODE_ENV);

module.exports = class GroupService {
  static async createGroup(groupData) {
    const [group, created] = await Group.findOrCreate({
      where: {
        name: groupData.groupName,
      },
      defaults: {
        id: uuid.v4(),
        permissions: groupData.groupPermissions.split(','),
      }
    });
    if(created) {
      logger.info('createGroup method invoked, group created', groupData);
      return 'created';
    }
    await Group.update({
      permissions: groupData.groupPermissions.split(','),
    }, {
      where: {
        name: groupData.groupName,
      },
    });
    logger.info('createGroup method invoked, group updated', groupData);
    return 'updated';
  }

  static async deleteGroup(groupData) {
    const group = await Group.destroy({
      where: {
        name: groupData.groupName
      }
    });
    logger.info(`deleteGroup method invoked, group ${group ? 'deleted' : 'notExists'}`, groupData);
    return group ? 'deleted' : 'notExists';
  }

  static async getGroup(groupData) {
    const group = await Group.findByPk(groupData.groupId);

    logger.info(`getGroup method invoked, ${group ? 'groupExists' : 'groupNotFound'}`, groupData);
    return group
      ? {result: 'groupExists', data: `<strong>group name : ${group.getDataValue('name')}</strong>`}
      : {result: 'groupNotFound', data: ''}
  }


  static async getGroups(groupData) {
    const groups = await Group.findAll();

    if(groups) {
      let htmlString;
      groups.forEach((group) => {
        htmlString +=
          `<p>Group name:${group.getDataValue('name')}; 
            Group id ${group.getDataValue('id')}; 
            Group permissions ${group.getDataValue('permissions')}
          </p>`;
      });
      logger.info(`getGroups method invoked, groupsList ${htmlString}`, groupData);
      return {result: 'groupsList', data: htmlString};
    }
    logger.info(`getGroups method invoked, groupsNotFound`, groupData);
    return {result: 'groupsNotFound', data: ''};
  }


};
