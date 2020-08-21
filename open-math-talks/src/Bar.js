import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { auth, googleAuthProvider } from "./firebase/firebaseConfig";

const Bar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        auth.currentUser ? true : false
    );
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("Signed In!");
                console.log(user.email);
                setIsLoggedIn(true);
                // ...
            } else {
                // User is signed out.
                console.log("Signed Out.");
                setIsLoggedIn(false);
            }
        });
    });
    let authButton;
    if (isLoggedIn) {
        authButton = (
            <>
                <Button
                    variant="danger"
                    onClick={() => {
                        auth.signOut();
                        setIsLoggedIn(auth.currentUser ? true : false);
                    }}
                >
                    Sign out
                </Button>
            </>
        );
    } else {
        authButton = (
            <LinkContainer to="/login">
                <Button variant="outline-primary">Log In</Button>
            </LinkContainer>
        );
    }
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <LinkContainer to="/">
                <Navbar.Brand>Open Math Talks</Navbar.Brand>
            </LinkContainer>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="Talks" id="talks-dropdown">
                        <LinkContainer to="/talks">
                            <NavDropdown.Item>Upcoming Talks</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/addtalk">
                            <NavDropdown.Item>Give a Talk</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                    <LinkContainer to="/requests">
                        <Nav.Link>Requests</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/archive">
                        <Nav.Link>Archive</Nav.Link>
                    </LinkContainer>
                </Nav>
                <Nav>{authButton}</Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
export default Bar;
