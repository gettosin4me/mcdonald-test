import cron from 'node-cron';
import workerInterest from './contribution.interest.worker';
import InterestCalculatorWorkers from '../queues/workers/interest/interest.calculation';


const interest = (config) => {
    let running = false;
    cron.schedule(
        // '0 0 * * MON',
        '* * * * *',
        () => {
            if (!running) {
                running = true;
                // workerInterest.calculateInterest()
                new InterestCalculatorWorkers().send({})
                    .then(() => {
                        running = false;
                    })
                    .catch(() => {
                        running = false;
                    });
            }
        }
    );
};


const worker = (config) => {
    interest(config);
};

module.exports = worker;
