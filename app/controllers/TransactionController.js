import BaseController from './BaseController';
import TransactionService from '../services/TransactionService';

class TransactionController extends BaseController {
    static async update(req, res) {
        const data = await new TransactionService().update(req.params.id, req.body);

        return TransactionController.success(data, req, res, res.__('success.update'));
    }
}

export default TransactionController;
