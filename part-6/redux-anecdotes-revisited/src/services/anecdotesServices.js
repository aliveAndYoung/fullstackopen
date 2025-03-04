import axios from "axios";
const baseURL = "http://localhost:3001/anecdotes";

const getAll = async () => {
    const response = await axios.get(baseURL);
    return response.data;
};

const createNew = async (content) => {
    const response = await axios.post(baseURL, { content, votes: 0 });
    return response.data;
};

const vote = async (id, votess) => {
    const response = await axios.patch(`${baseURL}/${id}`, {
        votes: votess,
    });
    return response.data;
};
export default { getAll, createNew, vote };
