import Cookies from "js-cookie";
import webConfig from '../web.config.json'

class CookieManager {
    setCookie = (name: string, val: string, expires: string = "", path: string = "/") => {
        let n = this.getName(name);
        const value = val;

        let expireDay = 7;
        if (expires || (webConfig && webConfig.cookie.expire)) {
            expireDay = Number(webConfig.cookie.expire) || expireDay
        }

        // const date = new Date();
        // date.setTime(date.getTime() + (expireDay * 24 * 60 * 60 * 1000));
        // document.cookie = n + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
        Cookies.set(n, value, { expires: expireDay, path: path })
    }

    getCookie(name: string): string {
        let n = this.getName(name);
        return Cookies.get(n) || "";
    }

    getName(name: string): string {
        if (webConfig && webConfig.cookie && webConfig.cookie.mapping) {
            let target = webConfig.cookie.mapping.find(i => i.name === name)
            return (target && target.value) || ""
        }

        return ""
    }
}

export default CookieManager