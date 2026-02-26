const express = require('express');
const router = express.Router();

const ContactController = require('./contact.controller');
const { validate } = require('../../middlewares/validate');
const { contactIdParamSchema, ownerIdParamSchema, createContactSchema, updateContactSchema} = require('./contact.val');

router.post('/', validate(createContactSchema), ContactController.contactCreate);

router.get('/owner/:owner_id', validate(ownerIdParamSchema, 'params'), ContactController.contactGetAll);

router.get('/:id', validate(contactIdParamSchema, 'params'), ContactController.contactGetOne);

router.patch('/:id', validate(contactIdParamSchema, 'params'), validate(updateContactSchema, 'body'), ContactController.contactUpdate);

router.delete('/:id', validate(contactIdParamSchema, 'params'), ContactController.contactDelete);

module.exports = router;