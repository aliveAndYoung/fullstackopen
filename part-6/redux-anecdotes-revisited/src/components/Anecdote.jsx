import React from "react";
import { Vote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote }) => {
    const dispatch = useDispatch();
    const handelVote = () => {
        dispatch(Vote(anecdote.id));
        const notification = `you voted for ${anecdote.content}`;
        dispatch(setNotification(notification));
        setTimeout(() => {
            dispatch(setNotification(""));
        }, 5000);
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
