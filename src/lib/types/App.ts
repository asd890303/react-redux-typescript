import UserInfoModel from '../../models/api/userInfo'

export enum MainMenu {
    Home, Follow, Add, Message, Profile
}

export enum HomeSubMenu {
    Recommend, Hot, Nearby
}

//State
export interface AppState {
    currentHomeSubMenu: HomeSubMenu;
    currentMenu: MainMenu;
    isLogin: boolean;
    searchKeyword?: string;
    userInfo?: UserInfoModel | null;
}

export const TOGGLE_MENU = "TOGGLE_MENU"
export const TOGGLE_HOME_SUB_PAGE = "TOGGLE_HOME_SUB_PAGE"
export const USER_LOGIN = "USER_LOGIN"
//Action
interface toggleMenuAction {
    type: typeof TOGGLE_MENU;
    payload: number;
}

interface toggleHomeSubAction {
    type: typeof TOGGLE_HOME_SUB_PAGE;
    payload: number;
}

interface userLoginAction {
    type: typeof USER_LOGIN
    payload: UserInfoModel
}

export type AppActionType = toggleMenuAction | toggleHomeSubAction | userLoginAction