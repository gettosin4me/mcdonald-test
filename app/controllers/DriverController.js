import BaseController from './BaseController';
import DriverService from '../services/DriverService';

class DriverController extends BaseController {
    static async create(req, res) {
        const data = await new DriverService().create(req.body);

        return DriverController.success(data, req, res, res.__('success.create'));
    }

    static async update(req, res) {
        const data = await new DriverService().update(req.body);

        return DriverController.success(data, req, res, res.__('success.update'));
    }

    static async save(req, res) {
        const payload = { ...req.body, ...req.params };
        const data = await new DriverService().save(payload);

        return DriverController.success(data, req, res, res.__('success.update'));
    }

    static async update_transaction(req, res) {
        const data = await new DriverService().update_transaction(req.body);

        return DriverController.success(data, req, res, res.__('success.update'));
    }

    static async transactions(req, res) {
        const data = await new DriverService().fetch_transaction(req.params);

        return DriverController.success(data, req, res, res.__('success.fetched'));
    }
}

export default DriverController;
