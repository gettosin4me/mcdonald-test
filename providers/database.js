module.exports = {
    boot(mongoose, { config, options }) {
        // const url =
        mongoose.connect(config.get('database.url'), options).then(connection => {
            console.log('database connected');
        }).catch(error => {
            console.log(config.get('database.url'));
            console.log(error.message);
        });
        mongoose.Promise = global.Promise;
    }
};
