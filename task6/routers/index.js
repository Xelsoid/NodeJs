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
const GroupUserService = require('../services/usergroup');

index.post('/create_user', (req, res, next) => {
  const responsePromise = UserService.createUser(req.body);
  responsePromise
    .then((response) => res.send(RESPONSES.createUser[response]))
    .catch((err) => {next(err)});
});

index.post('/delete_user', (req, res, next) => {
  const responsePromise = UserService.deleteUser(req.body);
  responsePromise
    .then((response) => res.send(RESPONSES.deleteUser[response]))
    .catch((err) => {next(err)});
});

index.post('/update_user', (req, res, next) => {
  const responsePromise = UserService.updateUser(req.body);
  responsePromise
    .then((response) => res.send(RESPONSES.updateUser[response]))
    .catch((err) => {next(err)});
});

index.post('/find_users', (req, res, next) => {
  const responsePromise = UserService.findUsers(req.body);
  responsePromise
    .then((response) => res.send(RESPONSES.findUsers[response.result] + response.data))
    .catch((err) => {next(err)});
});

index.post('/get_user', (req, res, next) => {
  const responsePromise = UserService.getUser(req.body);
  responsePromise
    .then((response) => res.send(RESPONSES.getUser[response.result] + response.data))
    .catch((err) => {next(err)});
});

// GROUPS!!

index.post('/create_group', (req, res, next) => {
  const responsePromise = GroupService.createGroup(req.body);
  responsePromise
    .then((response) => res.send(RESPONSES.createGroup[response]))
    .catch((err) => {next(err)});
});

index.post('/update_group', (req, res, next) => {
  const responsePromise = GroupService.updateGroup(req.body);
  responsePromise
    .then((response) => res.send(RESPONSES.updateGroup[response]))
    .catch((err) => {next(err)});
});

index.post('/delete_group', (req, res, next) => {
  const responsePromise = GroupService.deleteGroup(req.body);
  responsePromise
    .then((response) => res.send(RESPONSES.deleteGroup[response]))
    .catch((err) => {next(err)});
});

index.post('/get_group', (req, res, next) => {
  const responsePromise = GroupService.getGroup(req.body);
  responsePromise
    .then((response) => res.send(RESPONSES.getGroup[response.result] + ' ' + response.data))
    .catch((err) => {next(err)});
});

index.post('/get_groups', (req, res, next) => {
  const responsePromise = GroupService.getGroups(req.body);
  responsePromise
    .then((response) => res.send(RESPONSES.getGroups[response.result] + response.data))
    .catch((err) => {next(err)});
});

index.post('/add_users_to_group', (req, res, next) => {
  const responsePromise = GroupUserService.addUsersToGroup(req.body.groupId, req.body.userId);
    responsePromise
      .then((response) => res.send(RESPONSES.addUserToGroups[response]))
      .catch((err) => {next(err)});
});

index.use('/', (req, res) => {
  res.sendFile(path.resolve(HTML_PATH, 'index.html'));
});

module.exports = index;
