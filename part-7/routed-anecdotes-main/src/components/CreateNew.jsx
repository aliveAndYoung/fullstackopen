import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = ({ addNew }) => {
    const { form: content, reset: contentReset } = useField("text");
    const { form: author, reset: authorReset } = useField("text");
    const { form: info, reset: infoReset } = useField("URL");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0,
        });
        navigate("/");
    };

    const handelReset = (e) => {
        e.preventDefault();
        contentReset();
        authorReset();
        infoReset();
    };
    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...content} />
                </div>
                <div>
                    author
                    <input {...author} />
                </div>
                <div>
                    url for more info
                    <input {...info} />
                </div>
                <button>create</button>
                <button onClick={handelReset}>Reset</button>
            </form>
        </div>
    );
};
export default CreateNew;
