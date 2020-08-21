import React from "react";
import Bar from "./Bar";
const Talks = (props) => {
    console.log(props.isSigningUp);
    return (
        <>
            <Bar />
            <div style={{ margin: "20rem" }}>
                <h2>Upcoming Talks</h2>
            </div>
        </>
    );
};
export default Talks;
