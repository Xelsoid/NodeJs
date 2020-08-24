'use strict';
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3003;
const HTML_PATH = `${__dirname}/src`;
const router = express.Router();
const bodyParser = require('body-parser');
const dirty = require('dirty');
const db = dirty('user.db');
const RESPONSES = require('./src/errorResponses');
const uuid = require( 'uuid');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

db.set('users', []);

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

const createBodySchema = Joi.object({
  userName: Joi.string().required(),
  userPassword: Joi.string().required().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,30}$/),
  userAge: Joi.number().required().integer().min(4).max(130),
});

router.post('/create_user', validator.body(createBodySchema), (req, res) => {
    let users = db.get('users');
    let user = null;

    users.forEach((currUser) => {
      let isUserAlreadyExists = checkIfUserLoginExists(currUser.login, req.body.userName);
      if(isUserAlreadyExists) {
        user = currUser;
      }
    });

    if(user && !user.isDeleted) {
      res.send(RESPONSES.userExistError);
    } else if(user && user.isDeleted) {
      user.isDeleted = false;
      user.password = req.body.userPassword;
      user.age = req.body.userAge;
      res.send(RESPONSES.userCreated);
    } else {
      const user = {
        id: uuid.v4(),
        login: req.body.userName,
        password: req.body.userPassword,
        age: req.body.userAge,
        isDeleted: false
      };
      users.push(user);
      res.send(RESPONSES.userCreated);
    }
    console.log('Created', db.get('users'));
});

const deleteBodySchema = Joi.object({
  userName: Joi.string().required(),
  userPassword: Joi.string().required().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,30}$/),
});

router.post('/delete_user', validator.body(deleteBodySchema), (req, res) => {
    let users = db.get('users');
    let user = null;

    users.forEach((currUser) => {
      let isUserAlreadyExists = checkIfUserLoginExists(currUser.login, req.body.userName);
      if(isUserAlreadyExists) {
        user = currUser;
      }
    });

    if(user) {
      let isPasswordMatches = checkIfUserPasswordMatches(user.password, req.body.userPassword);

      if(isPasswordMatches) {
        user.isDeleted = true;
        res.send(RESPONSES.userDeleted);
      } else {
        res.send(RESPONSES.userDeleteError);
      }
    } else {
      res.send(RESPONSES.userNotExists);
    }
    console.log('Deleted', db.get('users'));
});

const updateBodySchema = Joi.object({
  userName: Joi.string().required(),
  userPassword: Joi.string().required().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,30}$/),
  userNewPassword: Joi.string().required().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,30}$/),
  userAge: Joi.number().required().integer().min(4).max(130),
});

router.post('/update_user', validator.body(updateBodySchema), (req, res) => {
    let users = db.get('users');
    let user = null;

    users.forEach((currUser) => {
      let isUserAlreadyExists = checkIfUserLoginExists(currUser.login, req.body.userName);
      if(isUserAlreadyExists) {
        user = currUser;
      }
    });

    if(user) {
      let isPasswordMatches = checkIfUserPasswordMatches(user.password, req.body.userPassword);

      if(isPasswordMatches) {
        user.password = req.body.userNewPassword || user.password;
        user.age = req.body.userAge || user.age;
        res.send(RESPONSES.userUpdated);
      } else {
        res.send(RESPONSES.userUpdateError);
      }
    } else {
      res.send(RESPONSES.userNotExists);
    }
    console.log('Updated', db.get('users'));
});

const findBodySchema = Joi.object({
  userName: Joi.string().required(),
  userLimit: Joi.number().required(),
});

router.post('/find_users', validator.body(findBodySchema), (req, res) => {
  let users = db.get('users');
  let usersFiltered = getAutoSuggestUsers(users, req.body.userName, req.body.userLimit);

  if(usersFiltered && usersFiltered.length) {
    let htmlString;
    usersFiltered.forEach((user) => {
      htmlString += `<p>User login: ${user.login}; User id ${user.id}; User age ${user.age}</p>`
    });
    res.send(RESPONSES.userList + htmlString);
  } else {
    res.send(RESPONSES.usersNotFound);
  }
});

const getBodySchema = Joi.object({
  userId: Joi.string().required(),
});

router.post('/get_user', validator.body(getBodySchema), (req, res) => {
    let users = db.get('users');
    let user = null;

    users.forEach((currUser) => {
      let isUserAlreadyExists = checkIfUserIdExists(currUser.id, req.body.userId);
      if(isUserAlreadyExists) {
        user = currUser;
      }
    });

    if(user) {
      res.send(`${RESPONSES.userExists} <strong>user login : ${user.login} user age: ${user.age}</strong>`);
    } else {
      res.send(RESPONSES.userNotExists);
    }
    console.log('Got', db.get('users'));
});

router.use('/', (req, res) => {
  res.sendFile(path.resolve(HTML_PATH, 'index.html'));
});

const checkIfUserLoginExists = (userDB, userReq) => {
  return userDB === userReq;
};

const checkIfUserIdExists = (userDB, userReq) => {
  return userDB === userReq;
};

const checkIfUserPasswordMatches = (passwordDB, passwordReq) => {
  return passwordDB === passwordReq;
};

const getAutoSuggestUsers = (users, loginSubstring, limit) => {
  const regexp = new RegExp(loginSubstring, 'i');
  const usersFiltered = users.filter(user => {
    return regexp.test(user.login)
  });
  usersFiltered.length = limit;
  return usersFiltered;
};

app.use('/', router);
