import { useDispatch } from "react-redux";
import AnecdotesForm from "./components/AnecdotesForm";
import AnecdotesList from "./components/AnecdotesList";
import Filter from "./components/FilterAnecdotes";
import Notification from "./components/Notification";
import { useEffect } from "react";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeAnecdotes());
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
