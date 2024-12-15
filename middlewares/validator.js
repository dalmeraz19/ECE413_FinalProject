const Joi = require('joi');

exports.signupSchema = Joi.object({
    email: Joi.string()
    .min(6)
    .max(60)
    .required()
    .email({
        tlds: {allow: ['com', 'net', 'edu']},
    }),
    password: Joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*d).{8,}$')),
});

exports.signinSchema = Joi.object({
    email: Joi.string()
    .min(6)
    .max(60)
    .required()
    .email({
        tlds: {allow: ['com', 'net', 'edu']},
    }),
    password: Joi.string()
    .required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*d).{8,}$')),
});

exports.acceptCodeSchema = Joi.object({
	email: Joi.string()
		.min(6)
		.max(60)
		.required()
		.email({
			tlds: { allow: ['com', 'net'] },
		}),
	providedCode: Joi.number().required(),
});


exports.changePasswordSchema = Joi.object({
	newPassword: Joi.string()
		.required()
		.pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*d).{8,}$')),
	oldPassword: Joi.string()
		.required()
		.pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*d).{8,}$')),
});
