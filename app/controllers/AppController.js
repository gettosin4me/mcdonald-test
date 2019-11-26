import BaseController from './BaseController';
import Worker from '../workers/contribution.interest.worker';

class AppController extends BaseController {
    static index(req, res) {
        try {
            return AppController.success({ message: res.__('user.unavailable') }, req, res);
        } catch (e) {
            return AppController.handleError(e, req, res);
        }
    }

    static async play(req, res) {
        const data = await Worker.calculateInterest();
        return AppController.success(data, req, res, res.__('success.update'));
    }
}

export default AppController;
