import {POST_FAILED, POST_LOADED, POST_SUCCESS, POSTS_LOADED} from "../actions/types";

const initialState = {
    post: {title:"blog",description:"description",image:"image"},
    posts: [{title:"posts blog",description:" posts description",image:" posts image"}],
    loading: true,
    description: null
}

export default function (state = initialState, action)  {
    const { type, payload } = action;

    switch (type) {
        case POSTS_LOADED:
            return {
                ...state,
                posts:payload,
                loading: false,
            }
        case POST_LOADED:
            return {
                ...state,
                post: payload,
                loading: false
            }

        case POST_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
            }
        case POST_FAILED:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}