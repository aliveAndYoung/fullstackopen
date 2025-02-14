const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require("./models/person");
require("dotenv").config();

morgan.token("custom", (req) => {
    return `${
        req.method === "POST"
            ? JSON.stringify({ name: req.body.name, number: req.body.number })
            : ""
    } `;
});

app.use(express.static("dist"));
app.use(express.json());
app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :custom"
    )
);
app.use(cors());

// const Persons = [
//     {
//         id: '1',
//         name: 'Arto Hellas',
//         number: '040-123456',
//     },
//     {
//         id: '2',
//         name: 'Ada Lovelace',
//         number: '39-44-5323523',
//     },
//     {
//         id: '3',
//         name: 'Dan Abramov',
//         number: '12-43-234345',
//     },
//     {
//         id: '4',
//         name: 'Mary Poppendieck',
//         number: '39-23-6423122',
//     },
// ]

// const newID = () => {
//     const id = (Math.random() * 10000).toFixed(0)
//     return id
// }

app.get("/api/persons", (req, res) => {
    Person.find({}).then((result) => {
        res.json(result);
    });
});

app.get("/info", async (req, res) => {
    try {
        const count = await Person.countDocuments({});
        res.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${new Date()}</p>
    `);
    } catch (err) {
        console.log(err);
    }
});

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    Person.findById(id).then((result) => {
        res.json(result);
    });
});

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    Person.findByIdAndDelete(id).then((result) => {
        res.json(result);
    });
});

app.post("/api/persons", async (req, res) => {
    const toBeAdded = req.body;

    try {
        const isDuplicate = await Person.findOne({ name: toBeAdded.name });

        if (isDuplicate) {
            const updatedDocument = await Person.findOneAndUpdate(
                { name: toBeAdded.name },
                { number: toBeAdded.number },
                { new: true }
            );

            if (updatedDocument) {
                console.log("Document found and updated:", updatedDocument);
                res.json(updatedDocument);
            } else {
                console.log("No document found matching the criteria");
                res.status(404).json({ error: "Document not found" });
            }
        } else {
            if (toBeAdded.name && toBeAdded.number) {
                const person = new Person(toBeAdded);
                const savedDocument = await person.save();
                res.json(savedDocument);
            } else {
                res.status(400).json({ error: "Name or number missing" });
            }
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.put("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const updatedPerson = req.body;
    Person.findByIdAndUpdate(id, updatedPerson, { new: true })
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        });
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    }

    next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} and live`);
});
