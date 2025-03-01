import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";

const App = () => {
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

    useEffect(() => {
        let currUser = isLoggedIn();
        currUser !== "notFound" && setUser(currUser);
    }, []);

    return (
        <div>
            <Notification notification={notification} />
            {user ? (
                <Home user={user} setUser={setUser} setNotification={setNotification} />
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
