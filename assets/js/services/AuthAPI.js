import React from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

function logout () {
    window.localStorage.removeItem('authToken')
    delete axios.defaults.headers['Authorization']
}

function Authenticate (credentials) {
    return axios.post("http://127.0.0.1:8001/api/login_check", credentials)
        .then(response => response.data.token )
        .then(token => {
            window.localStorage.setItem('authToken',token)
            //On previent qu'on dit à axios que l'on a un headers par défaut sur toutes nos requête HTTP
            setAxiosBearerToken(token)
        })
}

function setAxiosBearerToken ( token ) {
    axios.defaults.headers['Authorization'] = "Bearer " + token
}

function setUp (setIsAuthenticated) {
    if(hasToken()) {
        return setIsAuthenticated(true)
    }
    setIsAuthenticated(false)
}

function isAuthenticated() {
    return hasToken();

}

function hasToken () {
    const token = window.localStorage.getItem('authToken')
    if( token ) {
        const {exp: expiration} = jwtDecode(token)
        if ( expiration * 1000 > new Date().getTime() ) {
            setAxiosBearerToken(token)
            return true
        }
    }
    return false
}

function register (data) {
    return axios.post("http://127.0.0.1:8001/api/users",data)
}


export default {
    Authenticate,
    logout,
    setUp,
    isAuthenticated,
    register
}