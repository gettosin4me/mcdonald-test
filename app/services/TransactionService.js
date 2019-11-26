import moment from 'moment';
import DriverRepository from '../repositories/DriverRepository';
import TransactionRepository from '../repositories/TransactionRepository';
import Encryption from '../utils/Encryption';
import generateAccountNumber from '../utils/Account';

class TransactionService {
    create(payload) {
        return new Promise(async(resolve, reject) => {
            try {
                const driver = await new DriverRepository().find({ _id: payload.driver_id });
                if (!driver) {
                    return reject({
                        name: 'BadRequest',
                        message: 'Invalid Driver Id',
                        code: 400
                    });
                }
                const data = await new TransactionRepository().create(payload);

                const transaction = await new TransactionRepository().populate({ _id: data._id }, 'driver');
                resolve(transaction);
            } catch (e) {
                return reject({
                    name: 'ServiceUnavailable',
                    message: e,
                    code: 503
                });
            }
        });
    }

    update(transactionId, payload) {
        return new Promise(async(resolve, reject) => {
            try {
                const transaction = await new TransactionRepository().populate({ _id: transactionId }, 'driver');
                if (!transaction) {
                    return reject({
                        name: 'BadRequest',
                        message: 'Invalid Transaction Id',
                        code: 400
                    });
                }

                if (transaction.amount != payload.amount) {
                    return reject({
                        name: 'BadRequest',
                        message: 'Amount Inconsistency',
                        code: 400
                    });
                }

                if (transaction.status.toLowerCase() == 'success') {
                    return reject({
                        name: 'BadRequest',
                        message: 'Transaction has been approved',
                        code: 400
                    });
                }

                const driver = await new DriverRepository().find({ _id: payload.driver_id });
                if (!driver) {
                    return reject({
                        name: 'BadRequest',
                        message: 'Invalid Driver Id',
                        code: 400
                    });
                }

                let new_balance = transaction.driver.account_balance;
                if (payload.status.toLowerCase() == 'success') {
                    new_balance = parseFloat(transaction.driver.account_balance) + parseFloat(payload.amount);
                }

                const data = {
                    balance_as_at_now: transaction.driver.account_balance,
                    updated_account_balance: new_balance,
                    status: payload.status,
                    transaction_date: moment()
                };

                const update_data = await new TransactionRepository().updateById(transactionId, data);
                await new DriverRepository().updateById(transaction.driver.id, { account_balance: new_balance });

                const result = await new TransactionRepository().populate({ _id: update_data._id }, 'driver');
                resolve(result);
            } catch (e) {
                return reject({
                    name: 'ServiceUnavailable',
                    message: e,
                    code: 503
                });
            }
        });
    }

    validation_on_update() {

    }
}

export default TransactionService;
