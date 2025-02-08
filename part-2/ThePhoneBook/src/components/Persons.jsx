import React from "react";
import communication from "../ServerCommunication";

const Persons = ({ persons, del }) => (
    <div>
        {persons.map((p) => (
            <p key={p.id}>
                {" "}
                {p.name} {" => "} {p.number}{" "}
                <button
                    onClick={() => {
                        window.confirm(`Delete ${p.name} ?`) && del(p.id);
                    }}
                >
                    delete
                </button>
            </p>
        ))}
    </div>
);

export default Persons;
