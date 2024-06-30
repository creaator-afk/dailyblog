import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
import {AUTH_ERR0R, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED} from "./types";
import {setAlert} from "./alert";

export const loadUser = () => async (dispatch) => {
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try{
        const res = await axios.get('/api/auth')

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    }catch(err) {
        dispatch({
            type: AUTH_ERR0R
        })
    }
}

export const register = (email, password) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({ email, password });
    try {
        const res = await axios.post('/api/signUp', body, config);

        dispatch({ type: REGISTER_SUCCESS, payload: res.data });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL,
        });
    }
}

export const login = (email, password) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const body = JSON.stringify({ email, password });
    try {
        const res = await axios.post('/api/signin', body, config);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        dispatch(loadUser());
    }catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({type: LOGIN_FAIL, });
    }
}