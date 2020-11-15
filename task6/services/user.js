const uuid = require('uuid');
const { User } = require('../data-access/index');
const { Op } = require("sequelize");

module.exports = class UserService {
  static async createUser(userData) {
    const [user, created] = await User.findOrCreate({
      where: {
        login: userData.userName,
      },
      defaults: {
        password: userData.userPassword,
        age: userData.userAge,
        id: uuid.v4(),
        isdeleted: false,
      }
    });
    if(created) {
      return 'created';
    }
    if(user.getDataValue('isdeleted')) {
      await User.update({
        password: userData.userPassword,
        age: userData.userAge,
        isdeleted: false,
      });
      return 'created';
    }
    return 'exists';
  }

  static async deleteUser(userData) {
    const [user] = await User.update({ isdeleted: true }, {
      where: {
        login: userData.userName,
        password: userData.userPassword,
      }
    });
    return user ? 'deleted' : 'notExists';
  }

  static async updateUser(userData) {
    const [user] = await User.update({
      password: userData.userNewPassword,
      age: userData.userAge,
    }, {
      where: {
        login: userData.userName,
        password: userData.userPassword,
      }
    });

    return user ? 'userUpdated' : 'userNotUpdated';
  }

  static async findUsers(userData) {
    const users = await User.findAll({
      where: {
        login: {
          [Op.substring]: userData.userName
        }
      },
      limit: userData.userLimit
    });

    if(users) {
      let htmlString;
      users.forEach((user) => {
        htmlString +=
          `<p>User login:${user.getDataValue('login')}; 
            User id ${user.getDataValue('id')}; 
            User age ${user.getDataValue('age')}
          </p>`;
      });
      return {result: 'usersList', data: htmlString};
    }
    return {result: 'usersNotFound', data: ''};
  }

  static async getUser(userData) {
    const user = await User.findByPk(userData.userId);

     return user
       ? {result: 'usersExists', data: `<strong>user login : ${user.getDataValue('login')} user age: ${user.getDataValue('age')}</strong>`}
       : {result: 'usersNotFound', data: ''}
  }
};
