const express = require('express');
const router = express.Router();

const ContactController = require('./contact.controller');
const { validate } = require('../../middlewares/validate');
const { idParamSchema, createContactSchema, updateContactSchema } = require('./contact.val');

router.post('/', validate(createContactSchema), ContactController.contactCreate);
router.get('/:id', validate(idParamSchema, 'params'), ContactController.contactGetOne);
router.patch('/:id', validate(idParamSchema, 'params'), validate(updateContactSchema), ContactController.contactUpdate);
router.delete('/:id', validate(idParamSchema, 'params'), ContactController.contactDelete);

module.exports = router;