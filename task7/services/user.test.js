import { expect } from '@jest/globals';

const { UserMock } = require('../data-access/mockedSequelize');
const UserService = require('./user');

describe("User service", () => {
  let userService;
  beforeAll(() => {
    userService = new UserService(UserMock);
  });
  it("check createUser method (created)", () => {
    const userData = {
      userName: "testUser",
      userPassword: "testPassword",
    };
    const responsePromise = userService.createUser(userData);
    return responsePromise.then((response) =>
      expect(response).toBe('created')
    )
  });

  it("check createUser method (exists)", () => {
    UserMock.$queueResult(UserMock.build(), { wasCreated: false });
    const userData = {
      userName: "Anton",
      userPassword: "qwerty",
    };
    const responsePromise = userService.createUser(userData);
    return responsePromise.then((response) =>
      expect(response).toBe('exists')
    )
  });

  it("check deleteUser method (delete)", () => {
    const userData = {
      userName: "Anton",
      userPassword: "qwerty",
    };
    const responsePromise = userService.deleteUser(userData);
    return responsePromise.then((response) =>
      expect(response).toBe('deleted')
    )
  });

  it("check deleteUser method (not delete)", () => {
    const userData = {
      userName: "Anton1",
      userPassword: "qwerty1",
    };
    UserMock.$queueResult('');
    const responsePromise = userService.deleteUser(userData);
    return responsePromise.then((response) =>
      expect(response).toBe('notExists')
    )
  });

  it("check updateUser method (updated)", () => {
    const userData = {
      userName: "Anton",
      userPassword: "qwerty",
    };
    const responsePromise = userService.updateUser(userData);
    return responsePromise.then((response) =>
      expect(response).toBe('userUpdated')
    )
  });

  it("check updateUser method (not updated)", () => {
    const userData = {
      userName: "Anton1",
      userPassword: "qwerty1",
    };
    UserMock.$queueResult('');
    const responsePromise = userService.updateUser(userData);
    return responsePromise.then((response) =>
      expect(response).toBe('userNotUpdated')
    )
  });

  it("check findUsers method (found)", () => {
    const userData = {
      userName: "Anton",
      userPassword: "qwerty",
    };
    const responsePromise = userService.findUsers(userData);
    return responsePromise.then((response) =>
      expect(response.result).toBe('usersList')
    )
  });

  it("check findUsers method (not found)", () => {
    const userData = {
      userName: "Anton1",
      userPassword: "qwerty1",
    };
    UserMock.$queueResult('');
    const responsePromise = userService.findUsers(userData);
    return responsePromise.then((response) =>
      expect(response.result).toBe('usersNotFound')
    )
  });

  it("check getUser method (found)", () => {
    const userData = {
      userId: '1095c78d-a430-4170-b72e-a611af794465',
    };
    const responsePromise = userService.getUser(userData);
    return responsePromise.then((response) =>
      expect(response.result).toBe('usersExists')
    )
  });

  it("check getUser method (not found)", () => {
    const userData = {
      userId: 'abc',
    };
    UserMock.$queueResult('');
    const responsePromise = userService.getUser(userData);
    return responsePromise.then((response) =>
      expect(response.result).toBe('usersNotFound')
    )
  });
});
