import { expect } from '@jest/globals';

const { UserMock } = require('../data-access/mockedSequelize');
const UserService = require('./user');

const userService = new UserService(UserMock);

describe("User service", () => {
  it("check createUser method", () => {
    const userData = {
      userName: "testUser",
      userPassword: "testPassword",
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
      userName: "Anton",
      userPassword: "qwerty1",
    };
    const responsePromise = userService.deleteUser(userData);
    return responsePromise.then((response) =>
      expect(response).toBe('notExists')
    )
  });
});
