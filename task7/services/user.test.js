const { UserMock } = require('../data-access/mockedSequelize');
const UserService = require('./user');

const userService = new UserService(UserMock);

describe("User service", () => {
  it("check createUser method", () => {
    console.log(UserService);
    const body = {
      login: "Anton",
      userPassword: "qwerty",
    };
    const responsePromise = userService.createUser(body);
    responsePromise.then((response) => console.log(response))
  });
});
