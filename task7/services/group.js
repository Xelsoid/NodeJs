const uuid = require('uuid');
const { Group } = require('../data-access/index');

module.exports = class GroupService {
  constructor(Group) {
    this.group = Group;
  }

  async createGroup(groupData) {
    const [group, created] = await this.group.findOrCreate({
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
    await this.group.update({
      permissions: groupData.groupPermissions.split(','),
    }, {
      where: {
        name: groupData.groupName,
      },
    });
    return 'updated';
  }

  async deleteGroup(groupData) {
    const group = await this.group.destroy({
      where: {
        name: groupData.groupName
      }
    });
    return group ? 'deleted' : 'notExists';
  }

  async getGroup(groupData) {
    const group = await this.group.findById(groupData.groupId);
    return group
      ? {result: 'groupExists', data: `<strong>group name : ${group.get('name')}</strong>`}
      : {result: 'groupNotFound', data: ''}
  }


  async getGroups() {
    const groups = await this.group.findAll();

    if(groups) {
      let htmlString;
      groups.forEach((group) => {
        htmlString +=
          `<p>Group name:${group.get('name')}; 
            Group id ${group.get('id')}; 
            Group permissions ${group.get('permissions')}
          </p>`;
      });
      return {result: 'groupsList', data: htmlString};
    }
    return {result: 'groupsNotFound', data: ''};
  }


};
