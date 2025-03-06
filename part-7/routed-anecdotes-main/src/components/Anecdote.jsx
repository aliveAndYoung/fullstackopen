import React from "react";
import { useParams } from "react-router-dom";

const Anecdote = ({ getAnecdote }) => {
    const currID = Number(useParams().id);
    const anecdote = getAnecdote(currID);
    return (
        <div>
            <h2>{anecdote.content}</h2>
            <p>has {anecdote.votes} votes</p>
            <p>for more info see {anecdote.info}</p>
            <br />
        </div>
    );
};

export default Anecdote;
