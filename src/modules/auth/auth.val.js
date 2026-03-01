const Joi = require('joi');

const registerStartSchema = Joi.object({
    user_name: Joi.string().trim().min(3).max(100).required(),
    phone: Joi.string().trim().min(7).max(30).required(),
    password: Joi.string().min(6).max(100).required(),
}).required();

const registerVerifySchema = Joi.object({
    ticket_id: Joi.number().integer().positive().required(),
    code: Joi.string().trim().length(6).required(), // 6-digit OTP
}).required();

const loginSchema = Joi.object({
    user_name: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
}).required();

module.exports = {
    registerStartSchema,
    registerVerifySchema,
    loginSchema
};