import React, { useEffect, useRef, useState } from "react";
import blogService from "../services/blogs";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const Home = ({ user, setUser, setNotification }) => {
    const [blogs, setBlogs] = useState([]);

    let ref = useRef();

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

    const handelNewBlog = async (newBlog) => {
        try {
            let theNewBlog = await blogService.create(newBlog, user.token);

            const upadtedBlogList = blogs.concat(theNewBlog);
            setBlogs(upadtedBlogList);
            setNotification({
                message: `a new blog ${theNewBlog.title} by ${theNewBlog.author} added`,
                isError: false,
            });

            setTimeout(
                () =>
                    setNotification({
                        message: null,
                        isError: false,
                    }),
                5000
            );
        } catch (err) {
            console.log(err);
            setNotification({
                message: err.response,
                isError: true,
            });
            setTimeout(
                () =>
                    setNotification({
                        message: null,
                        isError: false,
                    }),
                5000
            );
        } finally {
            ref.current.toggleVisibility();
        }
    };

    useEffect(() => {
        blogService.getAll(user.token).then((blogs) => setBlogs(blogs));
    }, []);

    return (
        <div>
            <h2>blogs</h2>
            <h4>
                Logged in as {user.name}
                <button onClick={() => handelLogout()}>logout</button>
            </h4>
            <Togglable buttonLabel="Add New Blog" ref={ref}>
                <BlogForm handelNewBlog={handelNewBlog} />
            </Togglable>

            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default Home;
