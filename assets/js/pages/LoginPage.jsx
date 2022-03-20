import React, {useEffect, useState} from "react";
import axios from "axios";
import CustomersAPI from "../services/customersAPI";
import AuthAPI from "../services/AuthAPI";
import {Navigate} from 'react-router-dom'

const LoginPage = ({setIsAuthenticated}) => {
    const [credentials,setCredentials] = useState({
        username: "",
        password: ""
    })
    const [error, setError] = useState("")

    //Récupère les valeurs des champs
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget

        setCredentials({...credentials, [name]: value})
    }
    //Cache les errors
    const hideError = (event) => {
        event.preventDefault()
        setError("")
    }

    //Gestion du submit
    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            await AuthAPI.Authenticate(credentials)
            setIsAuthenticated(true)
            setError("")
            return <Navigate to="/" replace />
        }catch (error) {
            setError("Bad credentials")
        }
    }

    return (
        <>
            <h1>Connexion</h1>

            {error && <div onClick={hideError} className="alert alert-dismissible alert-danger"><button type="button" className="btn-close"></button>{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                    <label htmlFor="username">Email</label>
                    <input
                        value={credentials.username}
                        onChange={handleChange}
                        id="username"
                        name="username"
                        type="email"
                        className="form-control"
                        placeholder="contact@mail.fr"/>
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        value={credentials.password}
                        onChange={handleChange}
                        id="password"
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="Mot de passe"/>
                </div>

                <div className="form-group">
                    <button className="btn btn-success" type="submit">Se connecter</button>
                </div>
            </form>
        </>
    )
}

export default LoginPage