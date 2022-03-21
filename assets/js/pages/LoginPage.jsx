import React, {useEffect, useState} from "react";
import axios from "axios";
import CustomersAPI from "../services/customersAPI";
import AuthAPI from "../services/AuthAPI";
import {Navigate} from 'react-router-dom'
import Input from "../components/form/Input";
import {toast} from "react-toastify";

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
            toast.success('Vous êtes désormais connecté !', {
                theme: "colored"
            })
            return <Navigate to="/" replace />
        }catch (error) {
            toast.error("Aucun compte n'a été trouvé", {
                theme: "colored"
            })
            setError("Bad credentials")
        }
    }

    return (
        <>
            <h1>Connexion</h1>

            {error && <div onClick={hideError} className="alert alert-dismissible alert-danger"><button type="button" className="btn-close"></button>{error}</div>}

            <form onSubmit={handleSubmit}>
                <Input
                    label={"Email"}
                    value={credentials.username}
                    onChange={handleChange}
                    id={"username"}
                    name={"username"}
                    type={"email"}
                    placeholder={"contact@mail.fr"}
                />
                <Input
                    label={"Mot de passe"}
                    value={credentials.password}
                    onChange={handleChange}
                    id={"password"}
                    name={"password"}
                    type={"password"}
                    placeholder={"Mot de passe"}
                />

                <div className="form-group">
                    <button className="btn btn-success" type="submit">Se connecter</button>
                </div>
            </form>
        </>
    )
}

export default LoginPage