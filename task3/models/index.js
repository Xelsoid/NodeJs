const uuid = require('uuid');

module.exports = class UserModel {
  static create(userName, userPassword, userAge) {
    return {
      id: uuid.v4(),
      login: userName,
      password: userPassword,
      age: userAge,
      isDeleted: false,
    };
  }

  static restore(user, password, userAge) {
    user.isDeleted = false;
    user.password = password;
    user.age = userAge;
    return user
  }

  static delete(user) {
    user.isDeleted = true;
    return user
  }

  static update(user, password, userAge) {
    user.password = password;
    user.age = userAge;
    return user
  }

  static returnUsersList(users) {
    let htmlString;
    users.forEach((user) => {
      htmlString += `<p>User login: ${user.login}; User id ${user.id}; User age ${user.age}</p>`;
    });
    return htmlString;
  }

  static returnUser(user) {
    return `<strong>user login : ${user.login} user age: ${user.age}</strong>`;
  }
};
