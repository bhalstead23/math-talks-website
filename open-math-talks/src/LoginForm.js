import React, { useState } from "react";
import Button from "react-bootstrap/Button"; // Imports bootstrap Button preset
import Form from "react-bootstrap/Form"; // Imports bootstrap Form Preset

export default function LoginForm(props) {
    const [isSigningUp, setIsSigningUp] = useState(props.isSigningUp);
    console.log("Props: " + props.isSigningUp);
    console.log("State: " + isSigningUp);
    return (
        <>
            {isSigningUp ? (
                <Form>
                    <div style={{ textAlign: "left" }}>
                        <Form.Group controlId="formGroupName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder="Name" />
                        </Form.Group>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                value={props.email}
                                onChange={props.setEmail}
                            />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Choose a password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={props.password}
                                onChange={props.setPassword}
                            />
                        </Form.Group>
                        {/* <Form.Group
                            style={{ textAlign: "left" }}
                            controlId="formGroupUserType"
                        >
                            <Form.Check
                                type="radio"
                                label="Student"
                                name="userType"
                                id="student"
                            />
                            <Form.Check
                                type="radio"
                                label="Parent"
                                id="parent"
                                name="userType"
                            />
                            <Form.Check
                                type="radio"
                                label="Mentor"
                                id="mentor"
                                name="userType"
                            />
                        </Form.Group> */}
                    </div>
                    <Form.Group controlId="formBasicCheckbox">
                        <Button
                            variant="primary"
                            style={{ marginRight: "1rem" }}
                            onClick={() => {
                                setIsSigningUp(false);
                                props.signUp(props.email, props.password);
                            }}
                        >
                            Sign Up
                        </Button>
                        <Button
                            variant="secondary" onClick={() => setIsSigningUp(false)}
                        >
                            Back
                        </Button>
                    </Form.Group>
                </Form>
            ) : (
                <Form>
                    <Form.Group controlId="formBasicEmail" /*xs={7}*/>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            value={props.email}
                            onChange={props.setEmail}
                        />
                        <Form.Text className="text-danger">
                            {props.signInError}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={props.password}
                            onChange={props.setPassword}
                        />
                    </Form.Group>
                    <Form.Group
                        style={{ textAlign: "center" }}
                        controlId="formBasicCheckbox"
                    >
                        <Button
                            variant="primary"
                            style={{ marginRight: "1rem" }}
                            onClick={() =>
                                props.signIn(props.email, props.password)
                            }
                        >
                            Log In
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => setIsSigningUp(true)}
                        >
                            Sign Up
                        </Button>
                    </Form.Group>
                </Form>
            )}
        </>
    );
}
