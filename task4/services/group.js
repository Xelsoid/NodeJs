const uuid = require('uuid');
const { Group } = require('../data-access/index');
const { Op } = require("sequelize");

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
      return 'created';
    }
    await Group.update({
      permissions: groupData.groupPermissions.split(','),
    }, {
      where: {
        name: groupData.groupName,
      },
    });
    return 'updated';
  }

  static async deleteGroup(groupData) {
    console.log(groupData.groupName);
    try {
      const [group] = await Group.destroy({
        where: {
          name: groupData.groupName
        }
      });
      console.log(group);
      return group ? 'deleted' : 'notExists';
    }
    catch(e) {
      console.log(e);
    }
  }

  static async getGroup(groupData) {
    const group = await Group.findByPk(groupData.groupId);

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
      return {result: 'groupsList', data: htmlString};
    }
    return {result: 'groupsNotFound', data: ''};
  }


};
