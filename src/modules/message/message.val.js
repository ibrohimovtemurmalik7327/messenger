const Joi = require('joi');

const idParamSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
});

const createMessageSchema = Joi.object({
    from_user_id: Joi.number().integer().positive().required(),
    to_user_id: Joi.number().integer().positive().required(),

    message: Joi.string().min(1).required(),

    is_read: Joi.boolean().optional(),

    id: Joi.forbidden(),
    created_at: Joi.forbidden(),
    updated_at: Joi.forbidden(),
}).required();

const updateMessageSchema = Joi.object({
    from_user_id: Joi.forbidden(),
    to_user_id: Joi.forbidden(),

    message: Joi.string().min(1).optional(),

    is_read: Joi.boolean().strict().optional(),

    id: Joi.forbidden(),
    created_at: Joi.forbidden(),
    updated_at: Joi.forbidden(),
})
    .min(1)
    .required();

module.exports = {
    idParamSchema,
    createMessageSchema,
    updateMessageSchema,
};