import React from "react";

const Filter = ({ searched , setSearched }) => (
    <div>
        filter shown with:{" "}
        <input value={searched} onChange={(e) => setSearched(e.target.value)} />
    </div>
);
export default Filter;
