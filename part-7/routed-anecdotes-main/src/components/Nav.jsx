import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
    const padding = {
        paddingRight: 5,
    };
    return (
        <div>
            <Link style={padding} to="/">
                Anecdotes
            </Link>
            <Link style={padding} to="/create">
                Create New
            </Link>
            <Link style={padding} to="/about">
                About
            </Link>
        </div>
    );
};

export default Nav;
