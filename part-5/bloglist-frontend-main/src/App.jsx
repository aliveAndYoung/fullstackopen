import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState({
        message: null,
        isError: false,
    });
    const isLoggedIn = () => {
        const loggedUserJSON =
            JSON.parse(window.localStorage.getItem("user")) || "notFound";
        return loggedUserJSON;
    };

    const handelLogout = () => {
        window.localStorage.removeItem("user");
        setUser(null);
        setBlogs([]);
        setNotification({ message: "You are logged out", isError: false });
        setTimeout(
            () =>
                setNotification({
                    message: null,
                    isError: false,
                }),
            5000
        );
    };

    useEffect(() => {
        let currUser = isLoggedIn();
        currUser !== "notFound" && setUser(currUser);
    }, []);

    return (
        <div>
            <Notification notification={notification} />
            {user ? (
                <Home
                    handelLogout={handelLogout}
                    user={user}
                    blogs={blogs}
                    setBlogs={setBlogs}
                    setNotification={setNotification}
                />
            ) : (
                <LoginForm
                    setUser={setUser}
                    setNotification={setNotification}
                />
            )}
        </div>
    );
};

export default App;
