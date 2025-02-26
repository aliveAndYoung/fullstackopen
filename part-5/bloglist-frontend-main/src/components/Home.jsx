import React, { useEffect, useState } from "react";
import blogService from "../services/blogs";
import Blog from "./Blog";

const Home = ({ handelLogout, user, blogs, setBlogs }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");
    const handelNewBlog = async (event) => {
        event.preventDefault();
        const newBlog = { title, author, url };
        await blogService.create(newBlog, user.token);
        setTitle("");
        setAuthor("");
        setUrl("");
        setBlogs(blogs.concat(newBlog));
        console.log(blogs);
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
