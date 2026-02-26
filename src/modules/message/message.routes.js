const express = require('express');
const router = express.Router();

const MessageController = require('./message.controller');
const { validate } = require('../../middlewares/validate');

const { idParamSchema, createMessageSchema, updateMessageSchema } = require('./message.val');

router.post('/', validate(createMessageSchema), MessageController.messageCreate);

router.get('/:id', validate(idParamSchema, 'params'), MessageController.messageGetAll);

router.get('/one/:id', validate(idParamSchema, 'params'), MessageController.messageGetOne);

router.patch('/:id', validate(idParamSchema, 'params'), validate(updateMessageSchema), MessageController.messageUpdate);

router.delete('/:id', validate(idParamSchema, 'params'), MessageController.messageDelete);


module.exports = router;