module.exports = (router, ctrl, Validator, checkErrors, MethodNotAllowed) => {
    router.route('/').get(checkErrors(ctrl.index)).all(MethodNotAllowed);
    router.route('/playground').get(checkErrors(ctrl.play)).all(MethodNotAllowed);

    return router;
};
