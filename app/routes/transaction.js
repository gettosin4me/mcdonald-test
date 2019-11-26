const updateTransactionSchema = require('../requests/transactions/update');

module.exports = (router, ctrl, Validator, checkErrors, MethodNotAllowed) => {
    router.route('/transactions/:id').put(Validator.body(updateTransactionSchema), checkErrors(ctrl.update)).all(MethodNotAllowed);

    return router;
};
