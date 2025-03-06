import { useState } from "react";
import Nav from "./components/Nav";
import List from "./components/List";
import CreateNew from "./components/CreateNew";
import About from "./components/About";
import Footer from "./components/Footer";
import Anecdote from "./components/Anecdote";
import Notification from "./components/Notification";
import { Route, Routes, useParams } from "react-router-dom";

const App = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
            content: "If it hurts, do it more often",
            author: "Jez Humble",
            info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
            votes: 0,
            id: 1,
        },
        {
            content: "Premature optimization is the root of all evil",
            author: "Donald Knuth",
            info: "http://wiki.c2.com/?PrematureOptimization",
            votes: 0,
            id: 2,
        },
    ]);
    const [notification, setNotification] = useState("");

    const addNew = (anecdote) => {
        anecdote.id = Math.round(Math.random() * 10000);
        setAnecdotes(anecdotes.concat(anecdote));
        setNotification(
            `a new anecdote " ${anecdote.content} " by ${anecdote.author} created`
        );
        setTimeout(() => {
            setNotification("");
        }, 5000);
    };

    const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

    const vote = (id) => {
        const anecdote = anecdoteById(id);

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1,
        };

        setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
    };

    return (
        <div>
            <h1>Software anecdotes</h1>
            <Nav />
            <Notification msg={notification} />
            <Routes>
                <Route path="/" element={<List anecdotes={anecdotes} />} />
                <Route path="/create" element={<CreateNew addNew={addNew} />} />
                <Route path="/about" element={<About />} />
                <Route
                    path="/anecdotes/:id"
                    element={<Anecdote getAnecdote={anecdoteById} />}
                />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
