const express = require('express');
const router = express.Router();

const UserController = require('./user.controller');
const { validate } = require('../../middlewares/validate');
const { idParamSchema, createUserSchema, updateUserSchema, changePasswordSchema } = require('./user.val');

router.post('/', validate(createUserSchema), UserController.userCreate);

router.get('/', UserController.userGetAll);

router.get('/me', UserController.me);

router.get('/:id', validate(idParamSchema, 'params'), UserController.userGetOne);

router.patch('/:id', validate(idParamSchema, 'params'), validate(updateUserSchema), UserController.userUpdate);

router.delete('/:id', validate(idParamSchema, 'params'), UserController.userDelete);

router.patch('/:id/password', validate(idParamSchema, 'params'), validate(changePasswordSchema), UserController.userChangePassword);

module.exports = router;