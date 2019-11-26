const Joi = require('@hapi/joi');

const createAssociationSchema = Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.string().required()
});

module.exports = createAssociationSchema;
