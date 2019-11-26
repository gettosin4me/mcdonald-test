const path = require('path');

require('dotenv').config({
    path: path.resolve(`${__dirname}/../../../.env`)
});

const mongoose = require('mongoose');
const config = require('../../../config');
const providers = require('../../../providers');

const mongooseOptions = {
    useNewUrlParser: true,
    useCreateIndex: true
};

providers.database.boot(mongoose, { config, options: mongooseOptions });
