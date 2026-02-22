const Joi = require('joi');

const idParamSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});

const createUserSchema = Joi.object({
    email: Joi.string().email().max(191).allow(null, ''),
    phone: Joi.string().max(30).allow(null, ''),

    login: Joi.string().min(3).max(100).required(),
    password: Joi.string().min(6).max(128).required(), // password_hash emas

    user_name: Joi.string().min(2).max(100).required(),
    first_name: Joi.string().max(100).allow(null, ''),
    last_name: Joi.string().max(100).allow(null, ''),

    age: Joi.number().integer().min(0).allow(null),
    avatar_url: Joi.string().uri().max(255).allow(null, ''),

    // odatda bularni user yaratishda client yubormaydi (defaultlar bor)
    // agar admin create qilsa kerak bo'lishi mumkin
    role: Joi.string().valid('user', 'admin').optional(),
    status: Joi.string().valid('active', 'blocked', 'pending').optional(),

    // bu maydonlar odatda clientdan kelmaydi (server set qiladi)
    email_verified_at: Joi.date().optional(),
    last_login_at: Joi.date().optional(),
    password_changed_at: Joi.date().optional()
})
    .options({ abortEarly: true, stripUnknown: true });

// UPDATE (PATCH /users/:id) uchun
// kamida 1ta field kelishi shart
const updateUserSchema = Joi.object({
    email: Joi.string().email().max(191),
    phone: Joi.string().max(30),

    login: Joi.string().min(3).max(100),
    user_name: Joi.string().min(2).max(100),
    first_name: Joi.string().max(100).allow('', null),
    last_name: Joi.string().max(100).allow('', null),

    age: Joi.number().integer().min(0).allow(null),
    avatar_url: Joi.string().uri().max(255).allow('', null),

    // bularni odatda admin o'zgartiradi (kerak bo'lsa admin schema alohida qilinadi)
    role: Joi.string().valid('user', 'admin'),
    status: Joi.string().valid('active', 'blocked', 'pending'),

    email_verified_at: Joi.date().allow(null),
    last_login_at: Joi.date().allow(null),
    password_changed_at: Joi.date().allow(null)
})
    .min(1)
    .options({ abortEarly: true, stripUnknown: true });

module.exports = {
    idParamSchema,
    createUserSchema,
    updateUserSchema
};