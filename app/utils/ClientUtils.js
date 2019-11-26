const axios = require('axios');

class ClientUtils {
    constructor(base_url, auth_credentials) {
        this.client = axios;
        this.base_url = base_url;
        this.auth_credentials = auth_credentials;
        this.init({ base_url, auth_credentials });
    }

    init({ base_url, auth_credentials }) {
        this.instance = this.client.create({
            baseURL: base_url,
            auth: { ...auth_credentials }
        });
    }

    post(url, payloads) {
        return new Promise(async(resolve, reject) => {
            try {
                const data = await this.instance.post(url, { ...payloads });

                resolve(data.data);
            } catch (e) {
                console.log({ e });
                reject(e);
            }
        });
    }

    put(url, payloads) {
        return new Promise(async(resolve, reject) => {
            try {
                const data = await this.instance.post(url, { ...payloads });

                resolve(data.data);
            } catch (e) {
                reject(e);
            }
        });
    }

    get(url, params) {
        return new Promise(async(resolve, reject) => {
            try {
                const data = await this.instance.get(url, params);

                resolve(data.data);
            } catch (e) {
                reject(e);
            }
        });
    }
}

module.exports = ClientUtils;
