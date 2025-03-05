import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import anecdoteService from "../services/anecdotesServices";

const AnecdotesForm = () => {
    const dispatch = useDispatch();
    const handelCreate = async (event) => {
        event.preventDefault();
        const newAnecdote = event.target.anecdote.value;
        console.log(newAnecdote);
        dispatch(createAnecdote(newAnecdote));
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handelCreate}>
                <div>
                    <input type="text" name="anecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default AnecdotesForm;
