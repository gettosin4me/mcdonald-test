const Joi = require('@hapi/joi');

const updateTransactionSchema = Joi.object().keys({
    amount: Joi.number().required(),
    status: Joi.string().required(),
    driver_id: Joi.string().required()
});

module.exports = updateTransactionSchema;
