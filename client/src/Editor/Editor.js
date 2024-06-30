import React from 'react';
import './App.css';
import {Editor, EditorState, RichUtils} from 'draft-js';

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
        return (
            <div className="my-little-app">
                <h1>Write your blog here</h1>
                <input
                    type="button"
                    value="Bold"
                    data-style="BOLD"
                    onMouseDown={this.toggleInlineStyle}
                />

                <input
                    type="button"
                    value="Italic"
                    data-style="ITALIC"
                    onMouseDown={this.toggleInlineStyle}
                />
                <input
                    type="button"
                    value="Code"
                    data-style="CODE"
                    onMouseDown={this.toggleInlineStyle}
                />
                <input
                    type="button"
                    value="Underline"
                    data-style="UNDERLINE"
                    onMouseDown={this.toggleInlineStyle}
                />

                <div className="draft-editor-wrapper">
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}/>
                </div>
            </div>
        );
    }
}

export default BlogEditor;