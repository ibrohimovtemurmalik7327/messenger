const Joi = require('joi');
const passwordRule = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).+$';

const idParamSchema = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .required(),
}).options({ abortEarly: true, stripUnknown: true });

const createUserSchema = Joi.object({
    phone: Joi.string()
        .pattern(/^\+[0-9]+$/)
        .required()
        .min(9)
        .max(15)
        .messages({
            'string.pattern.base': 'Phone must start with + and contain digits only'
        }),

    user_name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required(),

    password: Joi.string()
        .min(8)
        .pattern(new RegExp(passwordRule))
        .required()
        .messages({
            'string.base': 'Password must be a string',
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 8 characters',
            'string.pattern.base': 'Password must contain uppercase, lowercase, number and special character',
            'any.required': 'Password is required',
        }),

    email: Joi.string()
        .trim()
        .email()
        .max(191)
        .allow(null, '')
        .optional(),

    avatar_url: Joi.string()
        .trim()
        .uri({
            scheme: ['http', 'https']
        })
        .max(255)
        .allow(null, '')
        .optional()
        .messages({
            'string.uri': 'Avatar URL must be a valid http or https URL'
        }),
})
    .unknown(false)
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
        .trim()
        .uri({
            scheme: ['http', 'https']
        })
        .max(255)
        .allow(null, '')
        .optional()
        .messages({
            'string.uri': 'Avatar URL must be a valid http or https URL'
        }),

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

const changePasswordSchema = Joi.object({

    old_password: Joi.string()
        .min(8)
        .pattern(new RegExp(passwordRule))
        .required()
        .messages({
            'string.base': 'Old password must be a string',
            'string.empty': 'Old password is required',
            'string.min': 'Old password must be at least 8 characters',
            'string.pattern.base':
                'Old password must contain uppercase, lowercase, number and special character',
            'any.required': 'Old password is required'
        }),

    new_password: Joi.string()
        .min(8)
        .pattern(new RegExp(passwordRule))
        .required()
        .invalid(Joi.ref('old_password'))
        .messages({
            'string.base': 'New password must be a string',
            'string.empty': 'New password is required',
            'string.min': 'New password must be at least 8 characters',
            'string.pattern.base':
                'New password must contain uppercase, lowercase, number and special character',
            'any.required': 'New password is required',
            'any.invalid': 'New password must be different from old password'
        })

})
    .unknown(false)
    .options({ abortEarly: true });

module.exports = {
    idParamSchema,
    createUserSchema,
    updateUserSchema,
    changePasswordSchema
};