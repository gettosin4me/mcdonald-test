const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DriverSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: '',
            required: true
        },
        association: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Association'
        },
        phone_number: {
            type: String,
            default: ''
        },
        account_number: {
            type: String,
            default: '',
            unique: true
        },
        account_balance: {
            type: String,
            default: 0
        },
        address: {
            type: String,
            required: true
        },
        password: {
            type: String,
            default: '',
            required: true
        },
        deleted_at: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        },
        toObject: {
            virtuals: true,
            retainKeyOrder: true
        },
        toJSON: {
            virtuals: true
        }
    }
);

DriverSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    delete obj._id;
    delete obj.__v;
    return obj;
};

DriverSchema.index(
    {
        id: 1,
        created_at: -1
    },
    {
        background: true
    }
);

/**
 * Validates password
 *
 * let user = await models.User.findOne({...})
 * user.validPassword(123456)
 */
DriverSchema.methods.validPassword = function(password) {
    return bcrypt.compare(password, this.get('password'));
};

const Driver = mongoose.model('Driver', DriverSchema);

exports.Driver = Driver;

module.exports = Driver;
