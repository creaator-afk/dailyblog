import {
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    REGISTER_FAIL, LOGIN_FAIL, LOGOUT, USER_LOADED, PROFILE_CREATED
} from "../actions/types";

const initialState = {
    token: localStorage.getItem('token') || '',
    isAuthenticated: false,
    loading: true,
    user: null
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case REGISTER_SUCCESS:
        case PROFILE_CREATED:
        case LOGIN_SUCCESS:
        case USER_LOADED:
            localStorage.setItem('token', payload.accessToken);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
            }
        default:
            return state;
    }
}
