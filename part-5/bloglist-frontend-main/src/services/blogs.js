import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = (token) => {
    const request = axios.get(baseUrl, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return request.then((response) => {
        return response.data;
    });
};

const create = async (newBlog, token) => {
    const response = await axios.post(baseUrl, newBlog, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
};

export default { getAll, create };
