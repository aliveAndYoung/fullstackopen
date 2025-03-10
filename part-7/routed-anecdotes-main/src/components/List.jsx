import React from "react";
import { Link } from "react-router-dom";

const List = ({ anecdotes }) => {
    // const toRoute = `/anecdotes/${anecdote.id}`;
    return (
        <div>
            <h2>Anecdotes</h2>
            <ul>
                {anecdotes.map((anecdote) => (
                    <li key={anecdote.id}>
                        <Link to={`/anecdotes/${anecdote.id}`}>
                            {anecdote.content}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default List;
