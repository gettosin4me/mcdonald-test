const Repository = require('./Repository');
const AssociationModel = require('../models/association');

class AssociationRepository extends Repository {
    constructor(props) {
        super(props);
        this.model = AssociationModel;
    }
}
module.exports = AssociationRepository;
