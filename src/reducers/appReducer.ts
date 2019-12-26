import { AppActionType, AppState, HomeSubMenu, MainMenu, TOGGLE_HOME_SUB_PAGE, TOGGLE_MENU } from '../types/App';

const initialState: AppState = {
    currentMenu: MainMenu.Home, // default home page
    currentHomeSubMenu: HomeSubMenu.Recommend, // default recommend page
    searchKeyword: ""
};

export function appReducer(
    state = initialState,
    action: AppActionType
): AppState {
    switch (action.type) {
        case TOGGLE_MENU:
            // 新增頁面不實作add
            return { ...state, currentMenu: action.payload === 2 ? state.currentMenu : action.payload };
        case TOGGLE_HOME_SUB_PAGE:
            return { ...state, currentHomeSubMenu: action.payload };
        default:
            return state;
    }
}
