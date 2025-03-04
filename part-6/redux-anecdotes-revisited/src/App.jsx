import { useSelector, useDispatch } from "react-redux";
import AnecdotesForm from "./components/AnecdotesForm";
import AnecdotesList from "./components/AnecdotesList";
import Filter from "./components/FilterAnecdotes";

const App = () => {
    return (
        <div>
            <h2>Anecdotes</h2>
            <Filter />
            <AnecdotesList />
            <AnecdotesForm />
        </div>
    );
};

export default App;
