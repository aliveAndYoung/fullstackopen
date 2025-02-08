import { useEffect, useState } from "react";
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import communication from "./ServerCommunication.js";
import "./style.css";
import Message from "./components/Message.jsx";

const App = () => {
    useEffect(() => {
        communication.getAll().then((res) => {
            setPersons(res);
        });
    }, []);
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [searched, setSearched] = useState("");
    const [notification, setNotification] = useState(null);
    const isDuplicated = (name, persons) =>
        persons.reduce((cumm, curr) => cumm || name === curr.name, false);

    const handelSubmit = (event) => {
        event.preventDefault();
        let theNewName = { name: newName, number: newNumber };
        if (isDuplicated(newName, persons)) {
            let UID = persons.reduce(
                (cumm, curr) =>
                    curr.name === theNewName.name ? curr.id : cumm,
                0
            );
            if (
                window.confirm(
                    `${newName} is already added to phonebook , replace the old number with the new one ?`
                )
            ) {
                theNewName = communication.updatePerson(UID, {
                    ...theNewName,
                    id: UID,
                });
                theNewName.then((updated) => {
                    setPersons(
                        persons.map((p) => (p.id === updated.id ? updated : p))
                    );
                    setNotification({
                        isError: false,
                        msg: `${updated.name}'s numper was updated`,
                    });
                    setTimeout(() => {
                        setNotification(null);
                    }, 4000);
                });
            }
        } else {
            communication.addPerson(theNewName).then((added) => {
                setPersons([...persons, added]);
            });
            setNotification({
                isError: false,
                msg: `${theNewName.name} was added`,
            });
            setTimeout(() => {
                setNotification(null);
            }, 4000);
        }
        setNewName("");
        setNewNumber("");
    };

    const handelDelete = (id) => {
        communication
            .delUser(id)
            .then((res) => {
                setPersons(persons.filter((p) => p.id !== res.id));
                setNotification({
                    isError: false,
                    msg: `  ${persons.reduce(
                        (cumm, curr) => (curr.id === id ? curr.name : cumm),
                        ""
                    )} was deleted`,
                });

                setTimeout(() => {
                    setNotification(null);
                }, 4000);
            })
            .catch((res) => {
                setPersons(persons.filter((p) => p.id !== id));
                setNotification({
                    isError: true,
                    msg: `information of ${persons.reduce(
                        (cumm, curr) => (curr.id === id ? curr.name : cumm),
                        ""
                    )} was already removed from the server`,
                });

                setTimeout(() => {
                    setNotification(null);
                }, 4000);
            });
    };

    let filteredPersons = persons.filter((p) =>
        p.name.toLowerCase().includes(searched.toLocaleLowerCase())
    );

    return (
        <div>
            <h2>Phonebook</h2>
            <Message notification={notification} />
            <Filter searched={searched} setSearched={setSearched} />
            <h2>Add a New</h2>
            <PersonForm
                handelSubmit={handelSubmit}
                newName={newName}
                setNewName={setNewName}
                newNumber={newNumber}
                setNewNumber={setNewNumber}
            />
            <h2>Numbers</h2>
            <Persons persons={filteredPersons} del={handelDelete} />
        </div>
    );
};

export default App;
