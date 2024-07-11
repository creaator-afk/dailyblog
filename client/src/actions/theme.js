import {SET_THEME} from "./types";

export const setTheme =() => (theme) => {
    theme({ type: SET_THEME});
}