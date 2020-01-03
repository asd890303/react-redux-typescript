
import CookieManager from '../cookie/cookie';
import { AppState, HomeSubMenu, MainMenu, USER_LOGIN, TOGGLE_MENU, TOGGLE_HOME_SUB_PAGE, AppActionType } from '../types/App';

const isLogin = () => {
    const cm = new CookieManager();
    if (cm.getCookie("user")) {
        let obj = {
            ...JSON.parse(cm.getCookie("user"))
        };
        return !!(obj.id && obj.token);
    }
    return false;
}

const initialState: AppState = {
    currentMenu: MainMenu.Home, // default home page
    currentHomeSubMenu: HomeSubMenu.Recommend, // default recommend page
    userInfo: null,
    isLogin: isLogin(), // todo detect from cookie & api
    searchKeyword: ""
};

export function appReducer(
    state = initialState,
    action: AppActionType
): AppState {
    switch (action.type) {
        case USER_LOGIN:
            return { ...state, userInfo: action.payload, isLogin: !!(action.payload.token && action.payload.id) };
        case TOGGLE_MENU:
            // 新增頁面不實作
            return { ...state, currentMenu: action.payload === 2 ? state.currentMenu : action.payload };
        case TOGGLE_HOME_SUB_PAGE:
            return { ...state, currentHomeSubMenu: action.payload };
        // case LOGOUT:
        //     return {}
        default:
            return state;
    }
}
