const dirty = require('dirty');
const db = dirty('user.db');

module.exports = class DataBase {
  static getDB(name) {
    return db.get(name);
  }

  static pushItemToDB(dataBase, item) {
    dataBase.push(item);
  }
};
