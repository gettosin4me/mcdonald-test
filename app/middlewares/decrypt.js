import Encryption from '../utils/Encryption';

module.exports = async(req, res, next) => new Promise(async(resolve, reject) => {
    try {
        const payload = await new Encryption('secret-7513b2a36696f3826f7417bc0986913c').decrypt(req.body);
        req.body = payload;
        next();
    } catch (e) {
        reject(e);
    }
});
