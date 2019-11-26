const createAssociationSchema = require('../requests/associations/create');
const updateAssociationSchema = require('../requests/associations/update');

module.exports = (router, ctrl, Validator, checkErrors, MethodNotAllowed) => {
    router.route('/associations').post(Validator.body(createAssociationSchema), checkErrors(ctrl.create)).all(MethodNotAllowed);
    router.route('/associations/:id').put(Validator.body(updateAssociationSchema), checkErrors(ctrl.update)).all(MethodNotAllowed);

    return router;
};
