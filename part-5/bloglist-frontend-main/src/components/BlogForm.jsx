import React, { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ handelNewBlog }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const handelSubmit = async (event) => {
        event.preventDefault();
        let newBlog = { title, author, url };
        setAuthor("");
        setTitle("");
        setUrl("");
        handelNewBlog(newBlog);
    };

    return (
        <div>
            <h2>Create a new blog</h2>
            <form onSubmit={handelSubmit}>
                <div>
                    title
                    <input
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        value={author}
                        onChange={(event) => setAuthor(event.target.value)}
                    />
                </div>
                <div>
                    url
                    <input
                        value={url}
                        onChange={(event) => setUrl(event.target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};
export default BlogForm;
