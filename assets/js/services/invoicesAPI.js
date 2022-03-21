import React from "react";
import axios from "axios";


function findAll () {
    return axios.get("http://127.0.0.1:8001/api/invoices")
        .then(response => response.data['hydra:member'])
}

function deleteInvoice ( id ) {
    return axios.delete("http://127.0.0.1:8001/api/invoices/" + id)
}

/**
 * Récupération d'une facture
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
function find(id) {
    return axios.get("http://127.0.0.1:8001/api/invoices/"+id)
        .then(response => response.data)
}

/**
 * Création d'une facture
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
function create(data) {
    return axios.post("http://127.0.0.1:8001/api/invoices", data)
}

/**
 * MAJ d'une facture
 * @param id
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
function update(id, data) {
    return axios.put("http://127.0.0.1:8001/api/invoices/"+id, data)
}

export default {
    findAll,
    delete: deleteInvoice,
    find,
    update,
    create
}