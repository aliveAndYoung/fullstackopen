import { useDispatch } from "react-redux";
import { CreateNew } from "../reducers/anecdoteReducer";

const AnecdotesForm = () => {
    const dispatch = useDispatch();
    const handelCreate = (event) => {
        event.preventDefault();
        const newAnecdote = event.target.anecdote.value;
        dispatch(CreateNew(newAnecdote));
        console.log(newAnecdote);
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
