import React from "react";
import Button from "react-bootstrap/Button";
import firebaseConfig from "./firebase/firebaseConfig";
import firebase from "firebase";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Jumbotron from "react-bootstrap/Jumbotron";
import Bar from "./Bar";
class AddTalk extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            subtitle: "",
            imgs: [""],
            captions: [""],
            content: "",
        };
    }

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        switch (name) {
            case "img0":
                this.setState({ imgs: [value] });
                break;
            case "caption0":
                this.setState({ captions: [value] });
                break;
            default:
                this.setState({ [name]: value });
        }
    };

    edit = (editDoc) => {
        console.log("truthy");
    };
    submit = (e) => {
        e.preventDefault();
        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true,
        });
        const set = {
            title: this.state.title,

            imgs: this.state.imgs,
            captions: this.state.captions,
            content: this.state.content,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        };

        db.collection("talks").doc().set(set);

        this.setState({
            eyeDee: undefined,
            title: "",
            subtitle: "",
            imgs: [""],
            captions: [""],
            content: "",
        });
    };
    // componentDidUpdate(prevProps) {
    //     if (prevProps.editDoc !== this.props.editDoc) {
    //         const editDoc = this.props.editDoc;
    //         console.log(editDoc);
    //         this.setState({
    //             eyeDee: editDoc.id,
    //             title: editDoc.data().title,
    //             subtitle: editDoc.data().subtitle,
    //             imgs: editDoc.data().imgs,
    //             captions: editDoc.data().captions,
    //             content: editDoc.data().content,
    //         });
    //     }
    // }
    render() {
        console.log("AddTalk rendered");

        const styles = {
            marginRight: "2rem",
            height: "610px",
        };
        return (
            <>
                <Bar />
                <div style={{ margin: "5rem" }}>
                    <h2>Add Talk</h2>
                    <Jumbotron style={{ height: "610px" }}>
                        <form>
                            <h3>Title: </h3>
                            <input
                                name="title"
                                value={this.state.title}
                                onChange={this.handleChange}
                            />

                            <br />
                            <h3>Description: </h3>
                            <CKEditor
                                editor={ClassicEditor}
                                data={this.state.content}
                                onInit={(editor) => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log(
                                        "Editor is ready to use!",
                                        editor
                                    );
                                }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    this.setState({ content: data });
                                }}
                                onBlur={(event, editor) => {
                                    //console.log("Blur.", editor);
                                }}
                                onFocus={(event, editor) => {
                                    //console.log("Focus.", editor);
                                }}
                            />
                            <br />
                            <br />
                            <br />
                            <br />
                            <Button
                                onClick={this.submit}
                                variant="outline-primary"
                                size="block"
                            >
                                Post
                            </Button>
                        </form>
                    </Jumbotron>
                </div>
            </>
        );
    }
}
export default AddTalk;
