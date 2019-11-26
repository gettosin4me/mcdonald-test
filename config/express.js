require('@babel/register');
require('babel-polyfill');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const i18n = require('i18n');
const config = require('./../config');
const routes = require('./../app/routes');
const providers = require('./../providers');
const { mongooseOptions, i18nOptions } = require('./options');
const errors = require('../app/middlewares/errors');
const workers = require('../app/workers');

module.exports = () => {
    const app = express();

    // protect app from well known vulnerability
    app.use(helmet());

    app.disable('x-powered-by');

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });

    // initialise bodyParser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: 100000 }));

    // init worker
    workers(config);

    // initialise database
    providers.database.boot(mongoose, { config, options: mongooseOptions });

    // init localization
    providers.locale.boot(app, { i18n, i18nOptions });

    // bootstrap routes
    providers.routes.boot(app, { config, routes });

    // bootstrap routes
    providers.errors.boot(app, errors);

    // start server and log the port on console
    app.listen(config.get('server.app.port'), started);

    return app;
};

/**
 * Called when server is started...
 * Displays information on the console
 */
function started() {
    console.log([
        '---------------------------',
        'Server Running',
        '---------------------------',
        `Port: ${config.get('server.app.port')}`,
        '---------------------------'
    ].join('\r\n'));
}
