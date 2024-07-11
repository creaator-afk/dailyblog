import {combineReducers} from 'redux';
import auth from "./auth";
import theme from "./theme";
import post from "./post"

export default combineReducers({
    auth,
    theme,
    post,
});