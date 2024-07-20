import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
import { setAlert } from "./alert";
import { getRequestConfig } from "../utils/requestConfig";
import {
    AUTH_ERROR, // Corrected typo here
    BACKEND_URL,
    CLEAR_PROFILE,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED
} from "./types";

export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get(`${BACKEND_URL}/api/auth`);
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR, // Corrected typo here
            payload: err.message
        });
    }
};

export const register = (username, password) => async (dispatch) => {
    const config = getRequestConfig();
    const body = JSON.stringify({ username, password });
    try {
        const res = await axios.post(`${BACKEND_URL}/api/signUp`, body, config);

        dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    } catch (err) {
        const errors = err.response?.data.errors; // Added safe navigation operator

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL,
        });
    }
};

export const login = (username, password) => async (dispatch) => {
    const config = getRequestConfig(); // Use getRequestConfig instead of defining a new object
    const body = JSON.stringify({ username, password });
    try {
        const res = await axios.post(`${BACKEND_URL}/api/signin`, body, config);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response?.data.errors; // Added safe navigation operator
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({ type: LOGIN_FAIL });
    }
};

export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT });
    dispatch({ type: CLEAR_PROFILE });
};