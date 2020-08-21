import React from "react";
import { Route, Redirect } from "react-router-dom";
import { auth } from "./firebase/firebaseConfig";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (auth.currentUser) {
                    return <Component {...rest} {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location,
                                },
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export default ProtectedRoute;
