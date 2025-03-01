import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async (token) => {
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

const incrementLikes = async (id, token) => {
    const response = await axios.put(
        `${baseUrl}/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
    return response.data;
};

const deleteBlog = async (id, token) => {
    const response = await axios.delete(`${baseUrl}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
};

export default { getAll, create, incrementLikes, deleteBlog };
