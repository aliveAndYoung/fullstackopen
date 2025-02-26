import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const isLoggedIn = () => {
        const loggedUserJSON =
            JSON.parse(window.localStorage.getItem("user")) || "notFound";
        return loggedUserJSON;
    };

    const handelLogout = () => {
        window.localStorage.removeItem("user");
        setUser(null);
    };

    useEffect(() => {
        let currUser = isLoggedIn();
        currUser !== "notFound" && setUser(currUser);
    }, []);

    return user ? (
        <Home
            handelLogout={handelLogout}
            user={user}
            blogs={blogs}
            setBlogs={setBlogs}
        />
    ) : (
        <LoginForm setUser={setUser} />
    );
};

export default App;
