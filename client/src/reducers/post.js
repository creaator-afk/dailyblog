import {POST_FAILED, POST_LOADED, POST_SUCCESS, POSTS_LOADED} from "../actions/types";

const initialState = {
    post: {title:"Blogs",description:"Loading....",image:"image"},
    posts: [
        {title:"Blogs",description:"Loading...",image:" posts image",category:"tech"},
        {title:"Blogs",description:"Loading...",image:" posts image",category:"beauty"},
        {title:"Blogs",description:"Loading...",image:" posts image",category:"fashion"},
        {title:"Blogs",description:"Loading...",image:" posts image",category:"business"},
        {title:"Blogs",description:"Loading...",image:" posts image",category:"electronics"},
        {title:"Blogs",description:"Loading...",image:" posts image",category:"furniture"},

    ],
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