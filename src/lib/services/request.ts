import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import CookieManager from '../cookie/cookie';
import { serviceConfig } from './service.config';

const defaultOptions: AxiosRequestConfig = {
    method: 'get',
    // headers: { 'test': 'test' },
    timeout: 3000,
    responseType: 'json',
    params: {},
    data: {},
    withCredentials: true
}

interface Params {
    [key: string]: string;
}

class Request {
    service: AxiosInstance
    userInfo: {
        uid: string
        token: string
    }

    constructor() {
        this.service = axios.create({
            ...defaultOptions
        });

        let cookie = new CookieManager();
        let uid = "", token = "";
        let user = cookie.getCookie("user");
        if (user) {
            let obj = JSON.parse(user);
            uid = obj.id;
            token = obj.token;
        }

        this.userInfo = {
            uid: uid || "",
            token: token || ""
        }

        this.service.interceptors.response.use(this.handleSuccess, this.handleError);
    }

    // private validate(moudle: string) {
    //     return serviceConfig.services.filter((i) => { i.moudle == moudle }).length > 0;
    // }

    async get(moudle: string, rules: string, params: Params, callback: Function) {
        let path = serviceConfig.host + '/api/public/index.php?service=' + moudle + '.' + rules;

        return this.service.request(
            {
                method: "GET",
                url: path,
                params: {
                    ...params,
                    uid: this.userInfo.uid,
                    token: this.userInfo.token
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
                    uid: this.userInfo.uid,
                    token: this.userInfo.token
                },
                data: {
                    ...data,
                },
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

export default Request