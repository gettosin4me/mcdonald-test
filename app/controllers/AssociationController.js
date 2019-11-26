import BaseController from './BaseController';
import AssociationService from '../services/AssociationService';

class AssociationController extends BaseController {
    static async create(req, res) {
        // validation is handled at route level

        const data = await new AssociationService().create(req.body);

        // Errors are handled middleware level
        return AssociationController.success(data, req, res, res.__('success.create'));
    }

    static async update(req, res) {
        const data = await new AssociationService().update(req.params.id, req.body);

        return AssociationController.success(data, req, res, res.__('success.update'));
    }
}

export default AssociationController;
