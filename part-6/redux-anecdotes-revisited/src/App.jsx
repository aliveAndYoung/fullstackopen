import AnecdotesForm from "./components/AnecdotesForm";
import AnecdotesList from "./components/AnecdotesList";
import Filter from "./components/FilterAnecdotes";
import Notification from "./components/Notification";

const App = () => {
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
