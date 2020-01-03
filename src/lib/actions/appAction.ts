import { TOGGLE_HOME_SUB_PAGE, TOGGLE_MENU, USER_LOGIN } from '../types/App';

import CookieManager from '../cookie/cookie';
import UserInfoModel from '../../models/api/userInfo';

const cookie = new CookieManager();
function tooggleMenu(target: Number) {
    return {
        type: TOGGLE_MENU,
        payload: target
    };
}

function toggleHomeSubMenu(target: Number) {
    return {
        type: TOGGLE_HOME_SUB_PAGE,
        payload: target
    };
}

function userLogin(target: UserInfoModel) {
    let obj = {
        id: target.id,
        user_nicename: target.user_nicename,
        token: target.token,
        last_login_time: target.last_login_time
    }
    cookie.setCookie("user", JSON.stringify(obj))
    return {
        type: USER_LOGIN,
        payload: target,
    }
}

// function userLogin(target: UserInfoModel) {
//     return (dispatch: Dispatch) => {
//         dispatch({ type: USER_LOGIN, payload: target });
//     };
// }

export const AppAction = {
    tooggleMenu,
    toggleHomeSubMenu,
    userLogin,
}