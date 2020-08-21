import React from "react";
import Bar from "./Bar";
import { db } from "./firebase/firebaseConfig";
import PostCard from "./PostCard";
import CardDeck from "react-bootstrap/CardDeck";
import { auth } from "./firebase/firebaseConfig";
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

    editPost = (event) => {
        console.log("edit");
        // const edit = this.props.edit;
        // const target = event.target;
        // console.log(target);
        // const db = firebase.firestore();
        // const docID = target.getAttribute("eyeDee");
        // console.log(docID);
        // db.collection("posts")
        //   .doc(docID)
        //   .get()
        //   .then(function (doc) {
        //     edit(doc);
        //   });
    };

    deletePost = (id) => {
        console.log("del");
        // const db = firebase.firestore();

        // console.log(id);
        // if (this.state.confirmedDelete) {
        //   console.log("deleting!");
        //   db.collection("posts")
        //     .doc(id)
        //     .delete()
        //     .then(function () {
        //       console.log("Document successfully deleted!");
        //     })
        //     .catch(function (error) {
        //       console.error("Error removing document: ", error);
        //     });
        //   this.setState(
        //     { confirmedDelete: false, toDelete: undefined, showModal: false },
        //     () => console.log(this.state)
        //   );
        // } else {
        //   this.setState({ showModal: true, toDelete: id }, () =>
        //     console.log("toDelete", this.state.toDelete)
        //   );
        // }
    };
    render() {
        console.log(this.state.posts);
        const posts = this.state.posts;
        const postCards = posts.map((doc) => (
            <PostCard
                eyeDee={doc.id}
                title={doc.data().title}
                edit={this.editPost}
                delete={() => this.deletePost(doc.id)}
            />
        ));
        let userDisplay;
        if (auth.currentUser) {
            userDisplay = (
                <>
                    <Form inline>
                        <FormControl type="text" className="mr-sm-2" />
                        <Button variant="outline-success">Add</Button>
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
                            <Col md={{ span: 8, offset: 1 }}>
                                <h2>Requested Talks</h2>
                                <CardDeck>{postCards}</CardDeck>
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
