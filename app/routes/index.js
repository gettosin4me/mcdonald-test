import expressJoi from 'express-joi-validation';
import AppController from '../controllers/AppController';
import DriverController from '../controllers/DriverController';
import AssociationController from '../controllers/AssociationController';
import TransactionController from '../controllers/TransactionController';
import AppRoute from './app';
import DriverRoute from './driver';
import AssociationRoute from './association';
import TransactionRoute from './transaction';
import checkErrors from '../middlewares/check_errors';
import { MethodNotAllowed } from '../tools/errors';

const express = require('express');

const Validator = expressJoi.createValidator({
    passError: true
});

module.exports = () => {
    const router = express.Router();

    // enable app routes
    AppRoute(router, AppController, Validator, checkErrors, MethodNotAllowed);
    DriverRoute(router, DriverController, Validator, checkErrors, MethodNotAllowed);
    AssociationRoute(router, AssociationController, Validator, checkErrors, MethodNotAllowed);
    TransactionRoute(router, TransactionController, Validator, checkErrors, MethodNotAllowed);

    return router;
};
