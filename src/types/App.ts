export enum MainMenu {
    Home, Follow, Add, Message, Profile
}

export enum HomeSubMenu {
    Recommend, Hot, Nearby
}

//State
export interface AppState {
    currentMenu: MainMenu;
    currentHomeSubMenu: HomeSubMenu;
    searchKeyword: string;
}

export const TOGGLE_MENU = "TOGGLE_MENU"
export const TOGGLE_HOME_SUB_PAGE = "TOGGLE_HOME_SUB_PAGE"
//Action
interface toggleMenuAction {
    type: typeof TOGGLE_MENU;
    payload: number;
}

interface toggleHomeSubAction {
    type: typeof TOGGLE_HOME_SUB_PAGE;
    payload: number;
}

interface isLogin { }

interface loginAction { }

export type AppActionType = toggleMenuAction | toggleHomeSubAction