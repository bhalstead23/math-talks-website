import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import Talks from "./Talks";
import Requests from "./Requests";
import Archive from "./Archive";
import AddTalk from "./AddTalk";
import ProtectedRoute from "./ProtectedRoute";
function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/talks">
                    <Talks />
                </Route>
                <Route path="/requests">
                    <Requests />
                </Route>
                <ProtectedRoute exact path="/archive" component={Archive} />
                <ProtectedRoute exact path="/addtalk" component={AddTalk} />
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
