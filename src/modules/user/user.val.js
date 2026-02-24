const Joi = require('joi');

const idParamSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
}).options({ abortEarly: true, stripUnknown: true });

const createUserSchema = Joi.object({
    phone: Joi.string()
        .trim()
        .max(30)
        .required(),

    user_name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required(),

    email: Joi.string()
        .trim()
        .email()
        .max(191)
        .allow(null, '')
        .optional(),

    avatar_url: Joi.string()
        .uri()
        .max(255)
        .allow(null, '')
        .optional(),
})
    .options({ abortEarly: true, stripUnknown: true });

const updateUserSchema = Joi.object({
    user_name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .optional(),

    email: Joi.string()
        .trim()
        .email()
        .max(191)
        .allow(null, '')
        .optional(),

    avatar_url: Joi.string()
        .uri()
        .max(255)
        .allow(null, '')
        .optional(),

    login: Joi.string()
        .trim()
        .lowercase()
        .pattern(/^[a-z0-9_]{3,32}$/)
        .allow(null, '')
        .optional()
})
    .min(1)
    .unknown(false)
    .options({ abortEarly: true, stripUnknown: true });

module.exports = {
    idParamSchema,
    createUserSchema,
    updateUserSchema,
};