const uuid = require('uuid');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');
const secretKey = require('../constants/token');

module.exports = class UserService {
  constructor(User) {
    this.user = User;
  }

  async login(userData) {
    const user = await this.user.findOne({
      where: {
        login: userData.userName
      }
    });

    if (user) {
      if (userData.userPassword !== user.password) {
        return {status: 401, token: false, message: 'Wrong password'};
      }

      const token = jwt.sign({ id: user.id }, secretKey, {
        expiresIn: 1200000,
      });
      return {status: 200, token: token, message: 'logged'};
    } else {
      return {status: 404, token: false, message: 'User not found'};
    }
  }

  async createUser(userData) {
    const [user, created] = await this.user.findOrCreate({
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

    if(user.get('isdeleted')) {
      await this.user.update({
        password: userData.userPassword,
        age: userData.userAge,
        isdeleted: false,
      });
      return 'created';
    }
    return 'exists';
  }

  async deleteUser(userData) {
    const [user] = await this.user.update({ isdeleted: true }, {
      where: {
        login: userData.userName,
        password: userData.userPassword,
      }
    });
    return user ? 'deleted' : 'notExists';
  }

  async updateUser(userData) {
    const [user] = await this.user.update({
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

  async findUsers(userData) {
    const users = await this.user.findAll({
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
          `<p>User login:${user.get('login')}; 
            User id ${user.get('id')}; 
            User age ${user.get('age')}
          </p>`;
      });
      return {result: 'usersList', data: htmlString};
    }
    return {result: 'usersNotFound', data: ''};
  }

  async getUser(userData) {
    const user = await this.user.findById(userData.userId);

     return user
       ? {result: 'usersExists', data: `<strong>user login : ${user.get('login')} user age: ${user.get('age')}</strong>`}
       : {result: 'usersNotFound', data: ''}
  }
};
