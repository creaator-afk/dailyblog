import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {postBlog} from "../../actions/post";
import MDEditor from "@uiw/react-md-editor";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Material from "../../material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const Post = ({postBlog}) => {
    const defaultTheme = createTheme(Material())
    const [description, setDescription] = React.useState("");

    const editorStyles = {
        backgroundColor: defaultTheme.palette.background.paper,
        color: defaultTheme.palette.text.primary,
        input: { backgroundColor: defaultTheme.palette.background.paper },
        // Add more styles as needed to match your theme
    };
    const [formData, setFormData] = useState({
        title:'',
        password:'',
    })
    const { title,password} = formData;
    const onChange = (e) =>
        setFormData({...formData,[e.target.name]:e.target.value});

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container maxWidth="lg" data-color-mode="light">
                <Typography component="h2" variant="h3" >Write your blog here</Typography>
                <TextField
                    margin="normal"
                    fullWidth
                    required
                    id="title"
                    label="Title"
                    name="title"
                    autoFocus
                    value={title}
                    onChange={(e) => onChange(e)}
                />

                <MDEditor
                    hideToolbar={true}
                    value={description}
                    onChange={setDescription}
                    preview="live"
                    style={editorStyles} // Apply the custom styles
                />
                <Button
                    onClick={() => postBlog(description)}
                >
                    Submit
                </Button>
            </Container>

        </ThemeProvider>

    );
};

Post.propTypes = {
    postBlog: PropTypes.func.isRequired
};

const mapDispatchToProps = (state) => ({
    potBlog: state.post.postBlog
})

export default connect(mapDispatchToProps, {postBlog})(Post);