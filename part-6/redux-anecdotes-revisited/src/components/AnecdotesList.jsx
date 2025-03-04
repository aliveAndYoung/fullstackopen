import React from "react";
import Anecdote from "./Anecdote";
import { shallowEqual, useSelector } from "react-redux";

const AnecdotesList = () => {
    const StartWith = (anecdote, filter) => {
        return anecdote.content.toLowerCase().startsWith(filter.toLowerCase());
    };

    const currList = useSelector(
        ({ anecdotes, filter }) =>
            anecdotes.filter((anecdote) => StartWith(anecdote, filter)),
        shallowEqual
    );
    const sortedList = [...currList].sort((a, b) => b.votes - a.votes);

    return (
        <div>
            <h2>Anecdotes</h2>
            {sortedList.map((anecdote) => (
                <Anecdote key={anecdote.id} anecdote={anecdote} />
            ))}
        </div>
    );
};

export default AnecdotesList;
