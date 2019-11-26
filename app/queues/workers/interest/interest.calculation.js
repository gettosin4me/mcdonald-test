// const postWebhookRequest = require('../../utils/callbackRequest');
const publishToRabitmq = require('../../publishers');

module.exports = class WebhookEvent {
    async send({}) {
        try {
            await publishToRabitmq({
                worker: 'interest_calculation_task',
                message: {
                    action: 'interest_calculation',
                    type: 'fire',
                    data: {}
                }
            });


            // const response = await postWebhookRequest(callback_endpoint, data)
            // console.log(response)
        } catch (e) {
            console.error(e);
        }
    }
};
