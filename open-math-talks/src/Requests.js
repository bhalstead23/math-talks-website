import React from "react";
import Bar from "./Bar";
import { db } from "./firebase/firebaseConfig";
import ReqCard from "./ReqCard";
import CardDeck from "react-bootstrap/CardDeck";
import { auth, serverTimestamp } from "./firebase/firebaseConfig";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

class Requests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            showModal: false,
            toDelete: undefined,
            confirmedDelete: false,
            newReq: "",
        };
    }
    getRequests = () => {
        const postsRef = db.collection("requests");

        postsRef.onSnapshot((snapshot) => {
            let newReqs = [];
            snapshot.docs.forEach((doc) => {
                newReqs.push(doc);
            });
            this.setState({ posts: newReqs });
        });
    };

    componentDidMount() {
        this.getRequests();
    }

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({ [name]: value });
    };

    submit = (e) => {
        e.preventDefault();
        db.settings({
            timestampsInSnapshots: true,
        });
        const set = {
            request: this.state.newReq,
            timestamp: serverTimestamp(),
        };

        db.collection("requests").doc().set(set);

        this.setState({
            newReq: "",
        });
    };

    render() {
        console.log(this.state.posts);
        const posts = this.state.posts;
        const reqCards = posts.map((doc) => (
            <>
                <ReqCard
                    eyeDee={doc.id}
                    request={doc.data().request}
                    edit={this.editPost}
                    delete={() => this.deletePost(doc.id)}
                />
                <div />
            </>
        ));
        let userDisplay;
        if (auth.currentUser) {
            userDisplay = (
                <>
                    <Form inline>
                        <FormControl
                            name="newReq"
                            value={this.state.newReq}
                            onChange={this.handleChange}
                            type="text"
                            className="mr-sm-2"
                        />
                        <Button onClick={this.submit} variant="outline-success">
                            Add
                        </Button>
                    </Form>
                </>
            );
        } else {
            userDisplay = <p>Log in to add requests.</p>;
        }
        return (
            <>
                <Bar />
                <div style={{ margin: "5rem" }}>
                    <Container
                        fluid
                        style={{ display: "block", margin: "auto" }}
                    >
                        <Row style={{ justifyContent: "space-between" }}>
                            <Col md={{ span: 7, offset: 1 }}>
                                <h2>Requested Talks</h2>
                                {/* <CardDeck>{reqCards}</CardDeck> */}
                                {reqCards}
                            </Col>
                            <Col md="auto">
                                <h2>Add Request</h2>
                                {userDisplay}
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
        );
    }
}

export default Requests;
