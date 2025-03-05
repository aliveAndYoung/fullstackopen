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

// const vote = async (id) => {
//     const response = await axios.put(`${baseURL}/${id}`  );
//     return response.data;
// };
export default { getAll, createNew };
