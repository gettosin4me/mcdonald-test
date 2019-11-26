const Joi = require('@hapi/joi');

const createDriverSavingsSchema = Joi.object().keys({
    amount: Joi.number().required(),
    driver_id: Joi.string().required()
});

module.exports = createDriverSavingsSchema;
