import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials);
    if (response.status === 200) {
        return response.data;
    }
    return null;
};

export { login };
