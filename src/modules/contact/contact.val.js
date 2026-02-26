const Joi = require('joi');

const contactIdParamSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});

const userIdParamSchema = Joi.object({
    user_id: Joi.number().integer().positive().required()
});

const createContactSchema = Joi.object({
    owner_id: Joi.number().strict().integer().positive().required(),
    user_id: Joi.number().strict().integer().positive().required(),

    phone: Joi.string().trim().max(20).allow(null, ''),
    email: Joi.string().trim().email().max(150).allow(null, ''),
    address: Joi.string().trim().allow(null, ''),
    is_active: Joi.boolean().allow(null),

    created_at: Joi.forbidden(),
    updated_at: Joi.forbidden(),
});

const updateContactSchema = Joi.object({
    owner_id: Joi.forbidden(),
    user_id: Joi.forbidden(),

    phone: Joi.string().trim().max(20).allow(null, ''),
    email: Joi.string().trim().email().max(150).allow(null, ''),
    address: Joi.string().trim().allow(null, ''),
    is_active: Joi.boolean(),

    created_at: Joi.forbidden(),
    updated_at: Joi.forbidden(),
}).min(1);

module.exports = {
    contactIdParamSchema,
    userIdParamSchema,
    createContactSchema,
    updateContactSchema,
};