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
            setBlogs(sortBlogsByLikes(upadtedBlogList));
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

    const handelLikes = async (theID) => {
        try {
            const updatedBlog = await blogService.incrementLikes(
                theID,
                user.token
            );

            if (updatedBlog.id) {
                const updatedBlog = await blogService.getAll(user.token);
                setBlogs(sortBlogsByLikes(updatedBlog));
            } else {
                console.log(updatedBlog);
            }
            console.log(updatedBlog);
        } catch (err) {
            console.log(err);
            setNotification({
                message: err.response?.data?.error || "Failed to update likes",
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
        }
    };

    const handelBlogDeletion = async (theID) => {
        try {
            await blogService.deleteBlog(theID, user.token);
            const updatedBlogList = await blogService.getAll(user.token);
            setBlogs(sortBlogsByLikes(updatedBlogList));
            setNotification({
                message: "Blog deleted",
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
                message: err.response?.data?.error || "Failed to delete blog",
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
        }
    };

    function sortBlogsByLikes(blogs) {
        return blogs.slice().sort((a, b) => b.likes - a.likes);
    }

    useEffect(() => {
        blogService
            .getAll(user.token)
            .then((blogs) => setBlogs(sortBlogsByLikes(blogs)));
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
                <Blog
                    key={blog.id}
                    blog={blog}
                    handelLikes={handelLikes}
                    handelBlogDeletion={handelBlogDeletion}
                />
            ))}
        </div>
    );
};

export default Home;
