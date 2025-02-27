import React, { useEffect, useState } from "react";
import blogService from "../services/blogs";
import Blog from "./Blog";

const Home = ({ handelLogout, user, blogs, setBlogs, setNotification }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");
    const handelNewBlog = async (event) => {
        try {
            event.preventDefault();
            const newBlog = { title, author, url };
            await blogService.create(newBlog, user.token);
            setTitle("");
            setAuthor("");
            setUrl("");
            const upadtedBlogList = await blogService.getAll(user.token);
            setBlogs(upadtedBlogList);
            setNotification({
                message: `a new blog ${title} by ${author} added`,
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
                message: err.response.data.error,
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
            <h2>create new</h2>

            <form onSubmit={handelNewBlog}>
                <div>
                    title:
                    <input
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        name="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                        name="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>

            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default Home;
