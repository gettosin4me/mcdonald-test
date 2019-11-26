const InterestCalculation = require('../../../../workers/contribution.interest.worker');
const ClientUtils = require('../../../../utils/ClientUtils');

class InterestCalculationWorker {
    fire({}) {
        return new Promise(async(resolve, reject) => {
            try {
                const response = await InterestCalculation.calculateInterest();

                resolve(response);
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }
}

module.exports = InterestCalculationWorker;
