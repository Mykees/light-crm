import React from "react";
import axios from "axios";
import {INVOICES_API} from "./config";


function findAll () {
    return axios.get(INVOICES_API)
        .then(response => response.data['hydra:member'])
}

function deleteInvoice ( id ) {
    return axios.delete(INVOICES_API + `/${id}`)
}

/**
 * Récupération d'une facture
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
function find(id) {
    return axios.get(INVOICES_API+`/${id}`)
        .then(response => response.data)
}

/**
 * Création d'une facture
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
function create(data) {
    return axios.post(INVOICES_API, data)
}

/**
 * MAJ d'une facture
 * @param id
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
function update(id, data) {
    return axios.put(INVOICES_API+`/${id}`, data)
}

export default {
    findAll,
    delete: deleteInvoice,
    find,
    update,
    create
}