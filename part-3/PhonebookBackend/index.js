const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

morgan.token("custom", (req, res) => {
    return `${
        req.method === "POST"
            ? JSON.stringify({ name: req.body.name, number: req.body.number })
            : ""
    } `;
});

app.use(express.json());
app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :custom"
    )
);
app.use(cors());

let Persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];
const newID = () => {
    let id = (Math.random() * 10000).toFixed(0);
    return id;
};

const isDuplicate = (item, array) => {
    return array.reduce((cumm, curr) => cumm || item.name === curr.name, false);
};

app.get("/api/persons", (req, res) => {
    res.json(Persons);
});

app.get("/info", (req, res) => {
    res.send(`
        <p> Phonebook has info for ${Persons.length} people </p>
        <p>${new Date()}</p>
        `);
});

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const person = Persons.find((p) => p.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
});

app.delete("/api/persons/:id", (req, res) => {
    let id = req.params.id;
    let deletedPerson = Persons.find((p) => p.id === id);
    Persons = Persons.filter((p) => p.id !== id);
    res.json(deletedPerson);
});

app.post("/api/persons", (req, res) => {
    let toBeAdded = req.body;
    if (toBeAdded.name && toBeAdded.number) {
        if (isDuplicate(toBeAdded, Persons)) {
            res.status(409).json({ error: "name must be unique" }).end();
        } else {
            toBeAdded.id = newID();
            Persons = [...Persons, toBeAdded];
            res.json(toBeAdded);
        }
    } else {
        res.status(400).json({
            error: "name or number missing",
        });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} and live `);
});
