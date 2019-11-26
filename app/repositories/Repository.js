class Repository {
    constructor() {
        this.model = null;
    }

    create(payload) {
        return new Promise(async(resolve, reject) => {
            try {
                const data = await this.model.create(payload);

                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    }

    first(id) {
        return new Promise(async(resolve, reject) => {
            try {
                const data = await this.model.findById(id);

                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    }

    get() {
        return new Promise(async(resolve, reject) => {
            try {
                const data = await this.model.findById();

                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    }

    find(params) {
        return new Promise(async(resolve, reject) => {
            try {
                const data = await this.model.findOne(params);

                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    }

    populate(params, model) {
        return new Promise(async(resolve, reject) => {
            try {
                const data = await this.model.findOne({ ...params }).populate(model);

                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    }

    findId(id) {
        return new Promise(async(resolve, reject) => {
            try {
                const data = await this.model.findById(id);

                if (!data) {
                    return reject({
                        code: 404,
                        message: 'Model Not found'
                    });
                }

                if (data.deleted_at) {
                    return reject({
                        code: 404,
                        message: 'Model has been deleted'
                    });
                }

                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    }

    select(id, params) {
        return new Promise(async(resolve, reject) => {
            try {
                const data = await this.model.findById(id).select(params);

                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    }

    update(identifier, payload) {
        return new Promise(async(resolve, reject) => {
            try {
                payload.updated_at = Date.now();
                const data = await this.model.updateOne(identifier, payload);

                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    }

    updateById(id, payload) {
        return new Promise(async(resolve, reject) => {
            try {
                payload.updated_at = Date.now();
                const data = await this.model.findByIdAndUpdate(id, payload);

                resolve(data);
            } catch (e) {
                reject(e);
            }
        });
    }

    paginate(page, limit) {
        return new Promise(async(resolve, reject) => {
            try {
                const offset = parseInt((limit * page) - limit);

                const doors = await this.model.find({}).skip(parseInt(offset)).limit(parseInt(limit)).exec();
                const total_items = await this.model.countDocuments().exec();

                const response = {
                    data: doors,
                    meta: {
                        total_items,
                        limit: parseInt(limit),
                        total_page: parseInt(total_items / limit) != 0 ? Math.round(total_items / limit) : 1,
                        page: parseInt(page)
                    }
                };
                resolve(response);
            } catch (e) {
                reject(e);
            }
        });
    }

    group_by_driver_time(start_time, end_time) {
        return new Promise(async(resolve, reject) => {
            try {
                const response = this.model.aggregate()
                    .match({
                        transaction_date: {
                            $gte: new Date(start_time),
                            $lte: new Date(end_time)
                        },
                        $and: [ {
                            status: 'success',
                            transaction_type: 'savings',
                            payment_type: 'credit'
                        } ]
                    })
                    .group({
                        _id: {
                            driver: '$driver',
                            transaction_date: '$transaction_date'
                        },
                        entries: {
                            $push: {
                                amount: '$amount',
                                status: '$status',
                                updated_account_balance: '$updated_account_balance',
                                balance_as_at_now: '$balance_as_at_now'
                            }
                        }
                    })
                    .group({
                        _id: '$_id.driver',
                        time: {
                            $push: {
                                transaction_date: '$_id.transaction_date',
                                entries: '$entries'
                            }
                        }
                    })
                    .project({
                        _id: false,
                        driver: '$_id',
                        time: '$time'
                    });

                resolve(response);
            } catch (e) {
                reject(e);
            }
        });
    }
}

module.exports = Repository;
