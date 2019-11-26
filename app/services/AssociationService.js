import AssociationRepository from '../repositories/AssociationRepository';
import Encryption from '../utils/Encryption';

class AssociationService {
    constructor() {

    }

    create(payload) {
        return new Promise(async(resolve, reject) => {
            try {
                const data = new AssociationRepository().create(payload);
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

    update(associationId, payload) {
        return new Promise(async(resolve, reject) => {
            try {
                const data = await new AssociationRepository().updateById(associationId, payload);
                // const association = await new AssociationRepository().findId(associationId);
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
}

export default AssociationService;
