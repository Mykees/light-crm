import axios from "axios";

/**
 * Récupération de tous les customers
 * @returns {Promise<AxiosResponse<any>>}
 */
function findAll () {
    return axios.get("http://127.0.0.1:8001/api/customers")
        .then(response => response.data['hydra:member'])
}

/**
 * Suppression d'un customer
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
function deleteCustomer( id ){
    return axios.delete("http://127.0.0.1:8001/api/customers/" + id)
}

/**
 * Récupération d'un customer
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
function find(id) {
    return axios.get("http://127.0.0.1:8001/api/customers/"+id)
        .then(response => response.data)
}

/**
 * Création d'un customer
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
function create(data) {
    return axios.post("http://127.0.0.1:8001/api/customers", data)
}

/**
 * MAJ d'un customer
 * @param id
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
function update(id, data) {
    return axios.put("http://127.0.0.1:8001/api/customers/"+id, data)
}


export default {
    findAll,
    delete: deleteCustomer,
    find,
    update,
    create
}