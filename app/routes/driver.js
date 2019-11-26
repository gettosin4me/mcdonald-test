const createDriverSchema = require('../requests/drivers/create');
const createDriverSavingsSchema = require('../requests/drivers/savings');

module.exports = (router, ctrl, Validator, checkErrors, MethodNotAllowed) => {
    router.route('/drivers').post(Validator.body(createDriverSchema), checkErrors(ctrl.create)).all(MethodNotAllowed);
    router.route('/drivers/save').post(Validator.body(createDriverSavingsSchema), checkErrors(ctrl.save)).all(MethodNotAllowed);
    router.route('/drivers/:id/transactions').get(checkErrors(ctrl.transactions)).all(MethodNotAllowed);

    return router;
};
