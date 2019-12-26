import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { serviceConfig } from './service.config';

const defaultOptions: AxiosRequestConfig = {
    method: 'get',
    // headers: { 'test': 'test' },
    timeout: 10000,
    responseType: 'json',
    params: {},
    data: {}
}

interface Params {
    [key: string]: string;
}

class Request {
    service: AxiosInstance

    constructor() {
        this.service = axios.create({
            ...defaultOptions
        });

        this.service.interceptors.response.use(this.handleSuccess, this.handleError);
    }

    // private validate(moudle: string) {
    //     return serviceConfig.services.filter((i) => { i.moudle == moudle }).length > 0;
    // }

    public get(moudle: string, rules: string, params: Params, callback: Function) {
        let path = serviceConfig.host + '/api/public/index.php?service=' + moudle + '.' + rules;

        return this.service.request(
            {
                method: "GET",
                url: path,
                params: {
                    ...params,
                    uid: '14636',
                    token: '9df102d9f2f1b1c3668a2f09a1f480c1'
                }
            }
        ).then(
            // handle success
            (response) => {
                if (response && response.status === 200) {
                    callback(response.data)
                }
            }
        )
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });

    }

    public post(moudle: string, rules: string, data: Params, callback: Function) {
        //"http://localhost:8050/api/public/index.php?service=Video.getVideoList&uid=14636&token=9df102d9f2f1b1c3668a2f09a1f480c1"
        let path = serviceConfig.host + '/api/public/index.php?service=' + moudle + '.' + rules;

        return this.service.request(
            {
                method: "POST",
                url: path,
                params: {
                    uid: '14636',
                    token: '9df102d9f2f1b1c3668a2f09a1f480c1'
                },
                data: {
                    ...data,
                }
            }
        ).then(
            // handle success
            (response) => {
                if (response && response.status === 200) {
                    callback(response.data)
                }
            }
        )
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });

    }

    handleSuccess = (response: any) => {
        return response;
    }

    handleError = (error: any) => {
        console.log(error)
        return Promise.reject(error)
    }
}

export default new Request()