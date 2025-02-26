import React from "react";
import { useState } from "react";
import { login } from "../services/Login";

const LoginForm = ({ setUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const saveLocally = (user) => {
        window.localStorage.setItem("user", JSON.stringify(user));
    };

    const handelSubmit = async (event) => {
        event.preventDefault();
        let theUser = { username: username, password: password };
        const isUser = await login(theUser);

        if (isUser && isUser.username && isUser.name && isUser.token) {
            setUsername("");
            setPassword("");
            setUser(isUser);
            saveLocally(isUser);
        } else {
            console.log("Wrong username or password");
        }
    };
    return (
        <div>
            <form onSubmit={handelSubmit}>
                <div>
                    User Name :
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    Password :
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
