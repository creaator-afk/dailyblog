import {CATEGORY_FAILED, CATEGORY_LOADED, POST_FAILED, POST_LOADED, POST_SUCCESS, POSTS_LOADED} from "../actions/types";

const initialState = {
    post: {title:"Blogs",description:"Loading....",image:"image",_id:""},
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
        case CATEGORY_LOADED:
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
        case CATEGORY_FAILED:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}