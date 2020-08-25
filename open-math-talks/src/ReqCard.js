import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const ReqCard = (props) => {
    const buttonStyle = { margin: "0.5rem" };
    return (
        <Card style={{ display: "block", width: "100%", margin: "0.5rem" }}>
            <Card.Img variant="top" src={props.img} />
            <Card.Body>
                <Card.Title>{props.request}</Card.Title>
                <Button
                    style={buttonStyle}
                    variant="outline-success"
                    eyeDee={props.eyeDee}
                    onClick={props.upvote}
                >
                    I'm interested
                </Button>
                <Button
                    style={buttonStyle}
                    variant="outline-primary"
                    eyeDee={props.eyeDee}
                    onClick={props.volunteer}
                >
                    I can do it!
                </Button>
            </Card.Body>
        </Card>
    );
};

export default ReqCard;
