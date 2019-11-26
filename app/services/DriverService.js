import moment from 'moment';
import DriverRepository from '../repositories/DriverRepository';
import AssociationRepository from '../repositories/AssociationRepository';
import TransactionRepository from '../repositories/TransactionRepository';
import Encryption from '../utils/Encryption';
import generateAccountNumber from '../utils/Account';

class DriverService {
    constructor() {

    }

    create(payload) {
        return new Promise(async(resolve, reject) => {
            try {
                const association = await new AssociationRepository().find({ _id: payload.association });
                if (!association) {
                    return reject({
                        name: 'BadRequest',
                        message: 'Invalid Association Id',
                        code: 400
                    });
                }
                payload.password = new Encryption().hash(payload.password);
                payload.account_number = generateAccountNumber();
                const data = await new DriverRepository().create(payload);

                const driver = await new DriverRepository().populate({ _id: data._id }, 'association');
                resolve(driver);
            } catch (e) {
                return reject({
                    name: 'ServiceUnavailable',
                    message: e,
                    code: 503
                });
            }
        });
    }

    save(payload) {
        return new Promise(async(resolve, reject) => {
            try {
                payload.driver = payload.driver_id;
                const driver = await new DriverRepository().find({ _id: payload.driver_id });
                if (!driver) {
                    return reject({
                        name: 'BadRequest',
                        message: 'Invalid Driver Id',
                        code: 400
                    });
                }

                payload.transaction_type = 'savings',
                payload.payment_type = 'credit';

                const transaction = await new TransactionRepository().create(payload);

                const data = await new TransactionRepository().populate({ _id: transaction._id }, 'driver');
                resolve(data);
            } catch (e) {
                return reject({
                    name: 'ServiceUnavailable',
                    message: e,
                    code: 503
                });
            }
        });
    }

    fetch_transaction(params) {
        return new Promise(async(resolve, reject) => {
            try {
                const page = params.page || 1;
                const limit = params.limit || 20;
                const res = {};
                const driver = await new DriverRepository().find({ _id: params.id });
                if (!driver) {
                    return reject({
                        name: 'BadRequest',
                        message: 'Invalid Driver Id',
                        code: 400
                    });
                }
                const data = await new TransactionRepository().paginate(page, limit);
                res.balance = driver.account_balance;
                res.history = data;
                resolve(res);
            } catch (e) {
                return reject({
                    name: 'ServiceUnavailable',
                    message: e,
                    code: 503
                });
            }
        });
    }
}

export default DriverService;
