const Joi = require('@hapi/joi');

const createAssociationSchema = Joi.object().keys({
    name: Joi.string(),
    address: Joi.string()
});

module.exports = createAssociationSchema;
