import { TOGGLE_HOME_SUB_PAGE, TOGGLE_MENU } from '../types/App';

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

export const AppAction = {
    tooggleMenu,
    toggleHomeSubMenu
}