const crypto = require('crypto');
const bcrypt = require('bcrypt');

const IV_LENGTH = 16;

class Encryption {
    constructor(secret) {
        this.secret = secret;
    }

    /**
    **encrypt text with user secret
    **/
    encrypt(text) {
        this.iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(this.secret), this.iv);
        let encrypted = cipher.update(text);

        encrypted = Buffer.concat([ encrypted, cipher.final() ]);

        return `${this.iv.toString('hex')}:${encrypted.toString('hex')}`;
    }

    /**
    **decrypt text with user secret
    **/
    decrypt(text) {
        const textParts = text.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(this.secret), iv);
        let decrypted = decipher.update(encryptedText);

        decrypted = Buffer.concat([ decrypted, decipher.final() ]);

        return decrypted.toString();
    }

    randomValueHex(length) {
        return crypto
            .randomBytes(Math.ceil(length / 2))
            .toString('hex') // convert to hexadecimal format
            .slice(0, length); // return required number of characters
    }

    generateSecret() {
        this.current_date = new Date();
        const uid = this.randomValueHex(12);
        return `secret-${crypto.createHash('md5').update(this.current_date + uid).digest('hex')}`;
    }

    hash(password) {
        return bcrypt.hashSync(password, 8);
    }
}

export default Encryption;
