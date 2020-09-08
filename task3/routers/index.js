
const express = require('express');
const index = express.Router();
const validator = require('express-joi-validation').createValidator({});
const RESPONSES = require('./errorResponses');
const HTML_PATH = `./task3`;
const path = require('path');
const dirty = require('dirty');
const db = dirty('user.db');
const {
  createBodySchema,
  deleteBodySchema,
  updateBodySchema,
  findBodySchema,
  getBodySchema
} = require('./validation');
const UserService = require('../services/index');
const UserModel = require('../models/index');

const getAutoSuggestUsers = (users, loginSubstring, limit) => {
  const regexp = new RegExp(loginSubstring, 'i');
  const usersFiltered = users.filter((user) => regexp.test(user.login));
  usersFiltered.length = limit;
  return usersFiltered;
};

// , validator.body(createBodySchema),
index.post('/create_user', (req, res) => {
  const {userName, userPassword, userAge} = req.body;
  const response = UserService.createUser(userName, userPassword, userAge);
  res.send(RESPONSES.createUser[response]);
});


// , validator.body(deleteBodySchema)
index.post('/delete_user', (req, res) => {
  const {userName, userPassword, userAge} = req.body;
  const response = UserService.deleteUser(userName, userPassword, userAge);
  res.send(RESPONSES.deleteUser[response]);
});

// , validator.body(updateBodySchema)
index.post('/update_user', (req, res) => {
  const {userName, userPassword, userAge, userNewPassword} = req.body;
  const response = UserService.updateUser(userName, userPassword, userNewPassword, userAge);
  res.send(RESPONSES.updateUser[response]);
});

//, validator.body(findBodySchema)

index.post('/find_users', (req, res) => {
  const {userName, userLimit} = req.body;
  const response = UserService.findUsers(userName, userLimit);
  res.send(RESPONSES.findUsers[response.result] + response.data);
});

//, validator.body(getBodySchema)
index.post('/get_user', (req, res) => {
  const {userId} = req.body;
  const response = UserService.getUser(userId);
  res.send(RESPONSES.getUser[response.result] + response.data);
});

index.use('/', (req, res) => {
  res.sendFile(path.resolve(HTML_PATH, 'index.html'));
});


module.exports = index;
