import { expect } from '@jest/globals';

const { UserMock } = require('../data-access/mockedSequelize');
const UserService = require('./user');

const userService = new UserService(UserMock);

describe("User service", () => {
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
    const userData = {
      userName: "Anton",
      userPassword: "qwerty",
    };
    const responsePromise = userService.createUser(userData);
    return responsePromise.then((response) =>
      expect(response).toBe('exists')
    )
  });

  it("check createUser method (created/deleted before)", () => {
    const userData = {
      userName: "Anton",
      userPassword: "qwerty",
      isDeleted: "true"
    };
    const responsePromise = userService.createUser(userData);
    return responsePromise.then((response) =>
      expect(response).toBe('created')
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
    const responsePromise = userService.deleteUser(userData);
    return responsePromise.then((response) =>
      expect(response).toBe('notExists')
    )
  });
});
