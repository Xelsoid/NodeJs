const UserModel = require('../models/index');
const DataBase = require('../data-access/index');

const getAutoSuggestUsers = (users, loginSubstring, limit) => {
  const regexp = new RegExp(loginSubstring, 'i');
  const usersFiltered = users.filter((user) => regexp.test(user.login));
  usersFiltered.length = limit;
  return usersFiltered;
};

const checkAndReturnItemIfExists = (dataBase, itemName, value) => dataBase.find((item) => (item[itemName] === value));

module.exports = class UserService {
  static createUser(userName, userPassword, userAge) {
    let result;
    const users = DataBase.getDB('users');
    const userItem = checkAndReturnItemIfExists(users, 'login', userName);

    if(!userItem) {
      const user = UserModel.create(userName, userPassword, userAge);
      DataBase.pushItemToDB(users, user);
      result = 'created';
    } else {
      if(userItem.isDeleted) {
        UserModel.restore(userItem, userPassword, userAge);
        result = 'created';
      } else {
        result = 'exists';
      }
    }
    console.log('Created', users);
    return result;
  }

  static deleteUser(userName, userPassword, userAge) {
    let result;
    const users = DataBase.getDB('users');
    const userItem = checkAndReturnItemIfExists(users, 'login', userName);

    if(!userItem) {
      result = 'notExists';
    } else {
      if(userItem.password === userPassword) {
        UserModel.delete(userItem);
        result = 'deleted';
      } else {
        result = 'wrongPasswordEntered';
      }
    }
    console.log('Deleted', users);
    return result;
  }

  static updateUser(userName, userPassword, userNewPassword, userAge) {
    let result;
    const users = DataBase.getDB('users');
    const userItem = checkAndReturnItemIfExists(users, 'login', userName);

    if(!userItem) {
      result = 'notExists';
    } else {
      if(userItem.password === userPassword) {
        const password = userNewPassword || userItem.password;
        const age = userAge || userItem.age;
        UserModel.update(userItem, password, age);
        result = 'userUpdated'
      } else {
        result = 'userNotUpdated'
      }
    }
    console.log('Updated', users);
    return result;
  }

  static findUsers(userName, userLimit) {
    let result;
    const users = DataBase.getDB('users');
    const usersFiltered = getAutoSuggestUsers(users, userName, userLimit);

    if (usersFiltered && usersFiltered.length) {
      const usersList = UserModel.returnUsersList(usersFiltered);
      result = {result: 'usersList', data: usersList};
    } else {
      result = {result: 'usersNotFound', data: ''};
    }
    return result;
  }

  static getUser(userId) {
    let result;
    const users = DataBase.getDB('users');
    const userItem = checkAndReturnItemIfExists(users, 'id', userId);

    if(!userItem) {
      result = {result: 'usersNotFound', data: ''};
    } else {
      const userString = UserModel.returnUser(userItem);
      result = {result: 'usersExists', data: userString};
    }
    console.log('Deleted', users);
    return result;
  }
};
