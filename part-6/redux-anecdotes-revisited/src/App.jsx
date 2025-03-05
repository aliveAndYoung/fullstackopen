import { useDispatch } from "react-redux";
import AnecdotesForm from "./components/AnecdotesForm";
import AnecdotesList from "./components/AnecdotesList";
import Filter from "./components/FilterAnecdotes";
import Notification from "./components/Notification";
import anecdoteService from "./services/anecdotesServices";
import { useEffect } from "react";
import { setAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        anecdoteService
            .getAll()
            .then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
    });
    return (
        <div>
            <Notification />
            <h2>Anecdotes</h2>
            <Filter />
            <AnecdotesList />
            <AnecdotesForm />
        </div>
    );
};

export default App;
