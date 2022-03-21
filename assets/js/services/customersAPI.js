import axios from "axios";
import {CUSTOMERS_API} from "./config";

/**
 * Récupération de tous les customers
 * @returns {Promise<AxiosResponse<any>>}
 */
function findAll () {
    return axios.get(CUSTOMERS_API)
        .then(response => response.data['hydra:member'])
}

/**
 * Suppression d'un customer
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
function deleteCustomer( id ){
    return axios.delete(CUSTOMERS_API+`/${id}`)
}

/**
 * Récupération d'un customer
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
function find(id) {
    return axios.get(CUSTOMERS_API+`/${id}`)
        .then(response => response.data)
}

/**
 * Création d'un customer
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
function create(data) {
    return axios.post(CUSTOMERS_API, data)
}

/**
 * MAJ d'un customer
 * @param id
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
function update(id, data) {
    return axios.put(CUSTOMERS_API+`/${id}`, data)
}


export default {
    findAll,
    delete: deleteCustomer,
    find,
    update,
    create
}