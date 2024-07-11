import {
    SET_THEME
} from "../actions/types";

const initialState = {
    darkTheme: false,
};

export default function reducer(state = initialState, action) {
    const{type} = action;


    switch (type) {
        case SET_THEME:
            return{
                ...state,
                darkTheme: !state.darkTheme,
            }
        default:
            return state;
    }
}