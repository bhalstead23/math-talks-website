import React from "react";
import Button from "react-bootstrap/Button";
import { auth, db } from "./firebase/firebaseConfig";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Jumbotron from "react-bootstrap/Jumbotron";
import Bar from "./Bar";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
class AddTalk extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            presenter: "",
            description: "",
            datetime: "",
        };
    }

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({ [name]: value });
    };

    edit = (editDoc) => {
        console.log("truthy");
    };

    submit = (e) => {
        e.preventDefault();
        db.settings({
            timestampsInSnapshots: true,
        });
        const set = {
            title: this.state.title,
            presenter: this.state.presenter,
            description: this.state.description,
            datetime: this.state.datetime,
            timestamp: db.FieldValue.serverTimestamp(),
        };

        db.collection("talks").doc().set(set);

        this.setState({
            title: "",
            presenter: "",
            description: "",
            datetime: "",
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
    //             description: editDoc.data().description,
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
                <div
                    style={{
                        marginLeft: "5rem",
                        marginRight: "5rem",
                        marginTop: "2rem",
                    }}
                >
                    <h2>Give a Talk</h2>
                    <Jumbotron>
                        <Form>
                            <Form.Row>
                                <Col>
                                    <h4>Title: </h4>
                                </Col>

                                <Col>
                                    <Form.Control
                                        name="title"
                                        value={this.state.title}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </Form.Row>
                            <br />
                            <Form.Row>
                                <Col>
                                    <h4>Presenter: </h4>
                                </Col>
                                <Col>
                                    <Form.Control
                                        name="presenter"
                                        value={this.state.presenter}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </Form.Row>

                            <br />
                            <Form.Row>
                                <Col>
                                    <h4>Date + Time: </h4>
                                </Col>
                                <Col>
                                    <Form.Control
                                        name="datetime"
                                        value={this.state.datetime}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </Form.Row>

                            <br />
                            <Form.Row>
                                <Col>
                                    <h4>Description: </h4>
                                </Col>
                                <Col>
                                    <Form.Control
                                        as="textarea"
                                        rows="3"
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </Form.Row>
                            <br />
                            <br />
                            <br />
                            <Button
                                onClick={this.submit}
                                variant="outline-primary"
                                size="block"
                            >
                                Add Talk
                            </Button>
                        </Form>
                    </Jumbotron>
                </div>
            </>
        );
    }
}
export default AddTalk;
