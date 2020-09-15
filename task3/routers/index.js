const express = require('express');
const index = express.Router();
const validator = require('express-joi-validation').createValidator({});
const RESPONSES = require('../constants/errorResponses');
const HTML_PATH = `./task3`;
const path = require('path');
const {
  createBodySchema,
  deleteBodySchema,
  updateBodySchema,
  findBodySchema,
  getBodySchema
} = require('../validation/index');
const UserService = require('../services/index');

index.post('/create_user', validator.body(createBodySchema), (req, res) => {
  const responsePromise = UserService.createUser(req.body);
  responsePromise.then((response) => res.send(RESPONSES.createUser[response]))
});

index.post('/delete_user', validator.body(deleteBodySchema), (req, res) => {
  const responsePromise = UserService.deleteUser(req.body);
  responsePromise.then((response) => res.send(RESPONSES.deleteUser[response]));
});

index.post('/update_user', validator.body(updateBodySchema), (req, res) => {
  const responsePromise = UserService.updateUser(req.body);
  responsePromise.then((response) => res.send(RESPONSES.updateUser[response]));
});

index.post('/find_users', validator.body(findBodySchema), (req, res) => {
  const responsePromise = UserService.findUsers(req.body);
  responsePromise.then((response) =>
    res.send(RESPONSES.findUsers[response.result] + response.data));
});

index.post('/get_user', validator.body(getBodySchema), (req, res) => {
  const responsePromise = UserService.getUser(req.body);
  responsePromise.then((response) => res.send(RESPONSES.getUser[response.result] + response.data));
});

index.use('/', (req, res) => {
  res.sendFile(path.resolve(HTML_PATH, 'index.html'));
});

module.exports = index;
