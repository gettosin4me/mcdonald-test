const Repository = require('./Repository');
const DriverModel = require('../models/driver');

class DriverRepository extends Repository {
    constructor(props) {
        super(props);
        this.model = DriverModel;
    }
}
module.exports = DriverRepository;
