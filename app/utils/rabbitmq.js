const config = require('../../config');

const amqp = require('amqplib');

let connectionString;
switch (config.get('server.app.environment')) {
        case 'production':
            connectionString = `amqp://${config.get('rabbitmq.username')}:${config.get('rabbitmq.password')}@${config.get('rabbitmq.domain')}:${config.get('rabbitmq.port')}`;
            break;
        case 'development':
            connectionString = `amqp://${config.get('rabbitmq.username')}:${config.get('rabbitmq.password')}@${config.get('rabbitmq.domain')}:${config.get('rabbitmq.port')}`;
            break;
        default:
            connectionString = `amqp://${config.get('rabbitmq.username')}:${config.get('rabbitmq.password')}@${config.get('rabbitmq.domain')}:${config.get('rabbitmq.port')}`;
            break;
}

// console.log({ connectionString });
const connection = async() => {
    try {
        const amqpconnection = await amqp.connect(connectionString);
        const channel = await amqpconnection.createConfirmChannel();

        return {
            connection: amqpconnection,
            channel
        };
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

const rabbitmqArchitecture = worker => new Promise((resolve, reject) => {
    try {
        const exchange = 'aku.test.exchange';
        switch (worker) {
                case 'interest_calculation_task':
                    resolve({
                        queue: 'interest_calculation.queue',
                        exchange,
                        routingKey: 'interest_calculation.send'
                    });
                    break;
                default:
                    throw new Error('Invalid queue: Something bad happened!');
        }
    } catch (error) {
        reject(error);
    }
});

module.exports = { rabbitmq: connection, rabbitmqArchitecture };
