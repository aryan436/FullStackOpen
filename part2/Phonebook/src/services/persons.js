import axios from "axios";
const baseUrl = "/api/persons";
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response=>response.data)
}
const create = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response=>response.data)
}
const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
}
const updatePerson = (id,changedPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, changedPerson);
    return request.then((response)=>response.data)
}
    export default { getAll, create ,deletePerson,updatePerson}