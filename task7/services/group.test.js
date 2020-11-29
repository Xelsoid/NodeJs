import { expect } from '@jest/globals';

const { GroupMock } = require('../data-access/mockedSequelize');
const GroupService = require('./group');

describe("Group service", () => {
  let groupService;
  beforeAll(() => {
    groupService = new GroupService(GroupMock);
  });

  it("check createGroup method (created)", () => {
    const groupData = {
      groupName: "admin",
      groupPermissions: 'write, delete, create'
    };
    const responsePromise = groupService.createGroup(groupData);
    return responsePromise.then((response) =>
      expect(response).toBe('created')
    )
  });

  it("check createGroup method (updated)", () => {
    GroupMock.$queueResult(GroupMock.build(), { wasCreated: false });
    const groupData = {
      groupName: "test1",
      groupPermissions: 'write, delete, create'
    };
    const responsePromise = groupService.createGroup(groupData);
    return responsePromise.then((response) =>
      expect(response).toBe('updated')
    )
  });


  it("check deleteGroup method (delete)", () => {
    const groupData = {
      groupName: "admin",
    };
    const responsePromise = groupService.deleteGroup(groupData);
    return responsePromise.then((response) =>
      expect(response).toBe('deleted')
    )
  });

  it("check deleteGroup method (not delete)", () => {
    const groupData = {
      groupName: "admin1",
    };
    GroupMock.$queueResult('');
    const responsePromise = groupService.deleteGroup(groupData);
    return responsePromise.then((response) =>
      expect(response).toBe('notExists')
    )
  });

  it("check getGroup method (found)", () => {
    const groupData = {
      groupId: '80cdd44b-0947-43d6-88b3-7d6115f145b5',
    };
    const responsePromise = groupService.getGroup(groupData);
    return responsePromise.then((response) =>
      expect(response.result).toBe('groupExists')
    )
  });

  it("check getGroup method (not found)", () => {
    const groupData = {
      groupId: 'abc',
    };
    GroupMock.$queueResult('');
    const responsePromise = groupService.getGroup(groupData);
    return responsePromise.then((response) =>
      expect(response.result).toBe('groupNotFound')
    )
  });

  it("check getGroups method (found)", () => {
    const responsePromise = groupService.getGroups();
    return responsePromise.then((response) =>
      expect(response.result).toBe('groupsList')
    )
  });

  it("check getGroups method (not found)", () => {
    GroupMock.$queueResult('');
    const responsePromise = groupService.getGroups();
    return responsePromise.then((response) =>
      expect(response.result).toBe('groupsNotFound')
    )
  });

});
