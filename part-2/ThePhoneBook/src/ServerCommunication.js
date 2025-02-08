import axios from "axios";
let BaseURL = "http://localhost:3001/persons";
const getAll = () => {
    let request = axios
        .get(BaseURL)
        .then((res) => res.data)
        .catch((err) => {
            console.log(err);
        });
    return request;
};

const addPerson = (newPerson) => {
    let request = axios.post(BaseURL, newPerson);
    return request.then((res) => res.data);
};

const delUser = (id) => {
    let request = axios.delete(`${BaseURL}/${id}`);
    return request.then((res) => res.data);
};

const updatePerson = (id, udpated) => {
    let request = axios
        .put(`${BaseURL}/${id}`, udpated)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
    return request;
};
export default { getAll, addPerson, delUser, updatePerson };
