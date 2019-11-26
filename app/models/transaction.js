const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
    {
        driver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Driver'
        },
        amount: {
            type: String
        },
        balance_as_at_now: {
            type: String,
            default: ''
        },
        updated_account_balance: {
            type: String,
            default: ''
        },
        transaction_date: {
            type: Date
        },
        transaction_type: {
            type: String
        },
        payment_type: {
            type: String
        },
        status: {
            type: String,
            default: 'pending'
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

TransactionSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    delete obj._id;
    delete obj.__v;
    return obj;
};

TransactionSchema.index(
    {
        id: 1,
        created_at: -1
    },
    {
        background: true
    }
);

const Transaction = mongoose.model('Transaction', TransactionSchema);

exports.Transaction = Transaction;

module.exports = Transaction;
