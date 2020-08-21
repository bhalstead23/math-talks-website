import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const PostCard = (props) => {
    const buttonStyle = { margin: "0.5rem" };
    return (
        <Card style={{ width: "18rem", margin: "0.5rem" }}>
            <Card.Img variant="top" src={props.img} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Button
                    style={buttonStyle}
                    variant="outline-success"
                    eyeDee={props.eyeDee}
                    onClick={props.edit}
                >
                    I'm interested
                </Button>
                <Button
                    style={buttonStyle}
                    variant="outline-primary"
                    eyeDee={props.eyeDee}
                    onClick={props.delete}
                >
                    I can do it!
                </Button>
            </Card.Body>
        </Card>
    );
};

export default PostCard;
