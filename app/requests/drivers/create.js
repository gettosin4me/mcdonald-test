const Joi = require('@hapi/joi');

const createDriverSchema = Joi.object().keys({
    phone_number: Joi.string().required(),
    password: Joi.string().required(),
    association: Joi.string().required(),
    name: Joi.string().required(),
    address: Joi.string()
});

module.exports = createDriverSchema;
