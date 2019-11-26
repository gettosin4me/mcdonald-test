const moment = require('moment');
const TransactionRepository = require('../repositories/TransactionRepository');
const DriverRepository = require('../repositories/DriverRepository');

async function calculateInterest() {
    const transactions = await fetch_weekly_contributions();
    for (let i = 0; i < transactions.length; i++) {
        const history = transactions[i].time[0].entries.map(item => item.amount);
        const total_res = history.reduce((total, item) => parseFloat(total) + parseFloat(item));
        const interest = parseFloat((1.5 / 100) * total_res);
        const driver_res = await new DriverRepository().find({ _id: transactions[i].driver });
        // console.log({ _id: transactions[i].driver._id });
        const new_balance = parseFloat(interest) + parseFloat(driver_res.account_balance);
        const transaction_data = {
            amount: interest,
            updated_account_balance: new_balance,
            balance_as_at_now: driver_res.account_balance,
            status: 'success',
            transaction_date: moment(),
            driver: transactions[i].driver._id,
            transaction_type: 'interest',
            payment_type: 'credit'
        };
        const created_transaction = await new TransactionRepository().create(transaction_data);
        await new DriverRepository().updateById(created_transaction._id, { account_balance: new_balance });

        console.log('done');
    }
}

async function fetch_weekly_contributions() {
    const start_of_week = moment().subtract(1, 'weeks').startOf('isoWeek');
    const end_of_week = moment().subtract(1, 'weeks').endOf('isoWeek');
    const transactions = await new TransactionRepository().group_by_driver_time(start_of_week, end_of_week);

    return transactions;
}

module.exports = { calculateInterest, fetch_weekly_contributions };
