const Repository = require('./Repository');
const TransactionModel = require('../models/transaction');

class TransactionRepository extends Repository {
    constructor(props) {
        super(props);
        this.model = TransactionModel;
    }
}
module.exports = TransactionRepository;
