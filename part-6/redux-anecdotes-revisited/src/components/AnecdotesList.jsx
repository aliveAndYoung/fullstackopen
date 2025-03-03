import React from "react";
import Anecdote from "./Anecdote";
import { useSelector } from "react-redux";

const AnecdotesList = () => {
    const currList = useSelector((state) => state);
    const sortedList = currList.sort((a, b) => b.votes - a.votes);

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
