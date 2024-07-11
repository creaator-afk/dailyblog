import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {postBlog} from "../../actions/post";
import MDEditor from "@uiw/react-md-editor";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Material from "../../material";
import Button from "@mui/material/Button";

const Post = ({postBlog}) => {
    const defaultTheme = createTheme(Material())
    const [description, setDescription] = React.useState("");

    return (
        <ThemeProvider theme={defaultTheme}>
            <div>
                <MDEditor value={description} onChange={setDescription}/>
            </div>
            <Button
                onClick={() => postBlog(description)}
            >
                Submit
            </Button>
        </ThemeProvider>

    );
};

Post.propTypes = {
    postBlog: PropTypes.func.isRequired
};

const mapDispatchToProps = (state) => ({
    potBlog: state.post.postBlog
})

export default connect(mapDispatchToProps,{postBlog})(Post);