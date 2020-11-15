const Joi = require('joi');

const createBodySchema = Joi.object({
  userName: Joi.string().required(),
  userPassword: Joi.string().required().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,30}$/),
  userAge: Joi.number().required().integer().min(4)
    .max(130),
});

const deleteBodySchema = Joi.object({
  userName: Joi.string().required(),
  userPassword: Joi.string().required().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,30}$/),
});

const updateBodySchema = Joi.object({
  userName: Joi.string().required(),
  userPassword: Joi.string().required().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,30}$/),
  userNewPassword: Joi.string().required().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,30}$/),
  userAge: Joi.number().required().integer().min(4)
    .max(130),
});

const findBodySchema = Joi.object({
  userName: Joi.string().required(),
  userLimit: Joi.number().required(),
});

const getBodySchema = Joi.object({
  userId: Joi.string().required(),
});

module.exports = [createBodySchema, deleteBodySchema, updateBodySchema, findBodySchema, getBodySchema];
