import UserRepository from '../repositories/UserRepository';

const { Unauthorize } = require('../tools/errors');

module.exports = async(req, res, next) => {
    try {
        // Basic Authentication with username/password
        // parse login and password from headers
        const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
        if (!b64auth) {
            return next(Unauthorize('No Authorization provided'));
        }
        if (!req.headers.secret) {
            return next(Unauthorize('No Secret token provided'));
        }
        const [ username, password ] = new Buffer.from(b64auth, 'base64').toString().split(':');

        const secret = await new UserRepository().find({ secret_token: req.headers.secret });

        if (!secret) {
            return next(Unauthorize('Secret token is not present'));
        }

        const user = await new UserRepository().find({ email: username });

        if (!user) {
            return next(Unauthorize('Authentication Failed'));
        }

        if (secret.email !== user.email) {
            return next(Unauthorize('Invalid User'));
        }

        const isValidPassword = await user.validPassword(password);

        if (!isValidPassword) {
            return next(Unauthorize('Authentication Failed'));
        }
        req.user = user;
        next();
    } catch (error) {
        return next(error);
    }
};
