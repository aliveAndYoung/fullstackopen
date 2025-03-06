import React from "react";

const Notification = ({ msg }) => {
    const style = {
        borderColor: "green",
        border: "solid",
        padding: 10,
        borderWidth: 1,
    };
    return msg ? <div style={style}>{msg}</div> : null;
};

export default Notification;
