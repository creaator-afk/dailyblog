import React from 'react';
import './App.css';
import {Editor, EditorState, RichUtils} from 'draft-js';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import material from "../material";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "../Header";
import Button from "@mui/material/Button";

class BlogEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        };

        this.onChange = this.onChange.bind(this);
        this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
    }

    onChange (editorState) {
        this.setState({editorState});
    }

    toggleInlineStyle (event) {
        event.preventDefault();
        let style = event.currentTarget.getAttribute('data-style');
        this.setState({
            editorState: RichUtils.toggleInlineStyle(this.state.editorState, style)
        });
    }

    render() {
        const defaultTheme = createTheme(material());
        return (
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline/>
                <Header sections={[{title:"my Section"}]} title={"New Blog"} loggedIn={true}/>
                <div className="my-little-app">
                    <h1>Write your blog here</h1>
                    <Button type="button"
                            value="Bold"
                            data-style="BOLD"
                            variant="outlined"
                            onMouseDown={this.toggleInlineStyle}>
                        Bold
                    </Button>

                    <Button
                        variant="outlined"
                        type="button"
                        value="Italic"
                        data-style="ITALIC"
                        onMouseDown={this.toggleInlineStyle}
                    >Italic</Button>
                    <Button
                        variant="outlined"
                        type="button"
                        value="Code"
                        data-style="CODE"
                        onMouseDown={this.toggleInlineStyle}
                    >
                        Code
                    </Button>
                    <Button
                        variant="outlined"
                        type="button"
                        value="Underline"
                        data-style="UNDERLINE"
                        onMouseDown={this.toggleInlineStyle}
                    >
                        Underline
                    </Button>

                    <div className="draft-editor-wrapper">
                        <Editor
                            editorState={this.state.editorState}
                            onChange={this.onChange}/>
                    </div>
                    <Button
                        variant="contained">
                        Submit
                    </Button>
                </div>
            </ThemeProvider>

        );
    }
}

export default BlogEditor;