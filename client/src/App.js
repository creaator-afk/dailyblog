import './App.css';
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import SignIn from "./component/auth/SignIn";
import SignUp from "./component/auth/SignUp";
import Blog from "./component/blog/Blog";
import {Fragment, useEffect} from "react";
import Post1 from "./component/blog/posts/Post1";
import Post from "./component/post/Post";
import {Provider} from 'react-redux';
import store from './store'
import Dashboard from "./component/dashboard/Dashboard";
import Post2 from "./component/blog/posts/Post2";
import Post3 from "./component/blog/posts/Post3";
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
        <Provider store={store}>
            <BrowserRouter>
                <Header title="Daily Blog"/>
                <Fragment>
                    <Routes>
                        <Route path="/signin"       Component={SignIn}/>
                        <Route path="/signup"       Component={SignUp}/>
                        <Route path="/"             Component={Blog}/>
                        <Route path="/blog/post1"   Component={Post1}/>
                        <Route path="/blog/post2"   Component={Post2}/>
                        <Route path="/blog/post3"   Component={Post3}/>
                        <Route path="/blog/post"    Component={Post}/>
                        <Route path="/dashboard"    Component={Dashboard}/>
                        <Route path="/profile"    Component={Profile}/>
                    </Routes>
                </Fragment>
            </BrowserRouter>
        </Provider>
    );
}

export default App;