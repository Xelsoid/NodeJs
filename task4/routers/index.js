const express = require('express');
const index = express.Router();
const validator = require('express-joi-validation').createValidator({});
const RESPONSES = require('../constants/errorResponses');
const HTML_PATH = `./task4`;
const path = require('path');
const {
  createBodySchema,
  deleteBodySchema,
  updateBodySchema,
  findBodySchema,
  getBodySchema
} = require('../validation/index');
const UserService = require('../services/user');
const GroupService = require('../services/group');

index.post('/create_user', (req, res) => {
  const responsePromise = UserService.createUser(req.body);
  responsePromise.then((response) => res.send(RESPONSES.createUser[response]))
});

index.post('/delete_user', (req, res) => {
  const responsePromise = UserService.deleteUser(req.body);
  responsePromise.then((response) => res.send(RESPONSES.deleteUser[response]));
});

index.post('/update_user', (req, res) => {
  const responsePromise = UserService.updateUser(req.body);
  responsePromise.then((response) => res.send(RESPONSES.updateUser[response]));
});

index.post('/find_users', (req, res) => {
  const responsePromise = UserService.findUsers(req.body);
  responsePromise.then((response) =>
    res.send(RESPONSES.findUsers[response.result] + response.data));
});

index.post('/get_user', (req, res) => {
  const responsePromise = UserService.getUser(req.body);
  responsePromise.then((response) => res.send(RESPONSES.getUser[response.result] + response.data));
});

// GROUPS!!

index.post('/create_group', (req, res) => {
  const responsePromise = GroupService.createGroup(req.body);
  responsePromise.then((response) => res.send(RESPONSES.createGroup[response]));
});

index.post('/update_group', (req, res) => {
  const responsePromise = GroupService.updateGroup(req.body);
  responsePromise.then((response) => res.send(RESPONSES.updateGroup[response]));
});

index.post('/delete_group', (req, res) => {
  const responsePromise = GroupService.deleteGroup(req.body);
  console.log(req.body);
  responsePromise.then((response) => res.send(RESPONSES.deleteGroup[response]));
});

index.post('/get_group', (req, res) => {
  const responsePromise = GroupService.getGroup(req.body);
  responsePromise.then((response) => res.send(RESPONSES.getGroup[response.result] + ' ' + response.data));
});

index.post('/get_groups', (req, res) => {
  const responsePromise = GroupService.getGroups(req.body);
  responsePromise.then((response) => res.send(RESPONSES.getGroups[response.result] + response.data));
});

index.use('/', (req, res) => {
  res.sendFile(path.resolve(HTML_PATH, 'index.html'));
});

module.exports = index;
