import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import SignIn from "./component/auth/SignIn";
import SignUp from "./component/auth/SignUp";
import Blog from "./component/blog/Blog";
import {Fragment, useEffect} from "react";
import Post1 from "./component/blog/posts/Post1";
import Post from "./component/post/Post";
import {Provider} from 'react-redux';
import store from './store'
import Dashboard from "./component/dashboard/Dashboard";
import Header from "./component/header/Header";
import {loadUser} from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import {getBlog} from "./actions/post";
import Profile from "./component/profile/Profile";


if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
        store.dispatch(getBlog());
    }, []);
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Header title="Daily Blog"/>
                <Fragment>
                    <Routes>
                        <Route path="/signin" element={<SignIn/>}/>
                        <Route path="/signup" element={<SignUp/>}/>
                        <Route path="/" element={<Blog/>}/>
                        <Route path="/blog/post1" element={<Post1/>}/>
                        <Route path="/blog/post" element={<Post/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                    </Routes>
                </Fragment>
            </Provider>
        </BrowserRouter>
    );
}

export default App;