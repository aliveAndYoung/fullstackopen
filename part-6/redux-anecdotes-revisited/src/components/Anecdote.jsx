import React from "react";
import { Vote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

const Anecdote = ({ anecdote }) => {
    const dispatch = useDispatch();
    const handelVote = () => {
        dispatch(Vote(anecdote.id));
    };
    return (
        <div>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={() => handelVote()}>vote</button>
            </div>
        </div>
    );
};

export default Anecdote;
