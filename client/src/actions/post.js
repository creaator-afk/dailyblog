import axios from "axios";
import {POST_FAILED, POST_LOADED, POST_SUCCESS, POSTS_LOADED} from "./types";
import {setAlert} from "./alert";


export const getBlog = () => async (dispatch) => {
    try {
        const response = await axios.get("api/blog/");
        dispatch({
            type: POSTS_LOADED,
            payload: response.data,
        })
    }catch (error){
        dispatch({
            type: POST_FAILED,
            payload: {msg: error.message, status: error.status}
        })
    }
}

export const getBlogById = (id) => async (dispatch, getState) => {

    try{
        const response = await axios.get(`/api/blog/${id}`);
        dispatch({
            type: POST_LOADED,
            payload: response.data,
        })
    }catch (error){
        dispatch({
            type: POST_FAILED,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}

export const postBlog = (value) => async (dispatch) => {
    const description = value;
    const image = "my image";
    const title = description.toString().substring(0,6);

    const config = {
        headers:{
            'Content-type': 'application/json',
        },
    }

    const body = JSON.stringify({title,description,image});
    try{
        const res = await axios.post('/api/blog', body, config);
        dispatch({ type: POST_SUCCESS, payload: res.data });
    }catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: POST_FAILED,
        })
    }
}