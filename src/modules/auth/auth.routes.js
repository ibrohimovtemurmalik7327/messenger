const express = require('express');
const router = express.Router();

const AuthController = require('./auth.controller');
const { validate } = require('../../middlewares/validate');

const { registerStartSchema, registerVerifySchema, loginSchema} = require('./auth.val');

router.post('/register/start', validate(registerStartSchema), AuthController.registerStart);

router.post('/register/verify', validate(registerVerifySchema), AuthController.registerVerify);

router.get('/login', validate(loginSchema), AuthController.loginByUserName);

module.exports = router;