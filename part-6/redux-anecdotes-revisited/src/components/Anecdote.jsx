import React from "react";
import { vote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote }) => {
    const dispatch = useDispatch();
    const handelVote = () => {
        dispatch(vote(anecdote.id, anecdote.votes + 1));
        const notification = `you voted for ${anecdote.content}`;
        dispatch(setNotification(notification, 3));
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
