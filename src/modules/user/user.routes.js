// src/modules/user/user.routes.js
const express = require('express');
const router = express.Router();

const UserController = require('./user.controller');
const { validate } = require('../../middlewares/validate');
const { idParamSchema, createUserSchema, updateUserSchema } = require('./user.val');

// CREATE
router.post('/', validate(createUserSchema), UserController.userCreate);

// READ ALL
router.get('/', UserController.userGetAll);

// READ ONE
router.get('/:id', validate(idParamSchema, 'params'), UserController.userGetOne);

// UPDATE
router.patch('/:id', validate(idParamSchema, 'params'), validate(updateUserSchema), UserController.userUpdate);

// DELETE
router.delete('/:id', validate(idParamSchema, 'params'), UserController.userDelete);

module.exports = router;