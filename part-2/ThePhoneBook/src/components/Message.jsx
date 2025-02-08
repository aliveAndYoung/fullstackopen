import React from "react";

const Message = ({ notification }) => {
    if (notification) {
        let { isError, msg } = notification;
        return <div className={isError ? "error" : "msg"}>{msg}</div>;
    } else {
        return null;
    }
};

export default Message;
