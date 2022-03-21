import React, {useState} from "react";
import Input from "../components/form/Input";
import AuthAPI from "../services/AuthAPI";
import {useNavigate} from "react-router-dom";


const RegisterPage = () => {

    const navigate = useNavigate();
    const [user, setUser]  = useState({
        firstname:'',
        lastname:'',
        email: '',
        password:'',
        passwordConfirm: ''
    })
    const [errors, setErrors]  = useState({
        firstname:'',
        lastname:'',
        email: '',
        password:'',
        passwordConfirm: ''
    })

    /**
     * Récupération valeurs des champs
     * @param currentTarget
     */
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget

        setUser({...user, [name]: value})
    }

    /**
     * Gestion soumission des données
     * @param event
     * @returns {Promise<void>}
     */
    const handleSubmit = async (event) => {
        event.preventDefault()

        try{
            await AuthAPI.register(user)
            setErrors({})
            navigate('/login')
        }catch(error) {
            const apiErrors = {};
            if(error.response.data.violations){
                error.response.data.violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message
                })
            }
            if (user.password !== user.passwordConfirm) {
                apiErrors.passwordConfirm = "Les mots de passe ne sont pas identiques"
            }
            setErrors(apiErrors)
        }
    }

    return(
        <>
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    label={"Nom"}
                    value={user.lastname}
                    onChange={handleChange}
                    error={errors.lastname}
                    name={"lastname"}
                    placeholder={"Nom"}
                />
                <Input
                    label={"Prénom"}
                    value={user.firstname}
                    onChange={handleChange}
                    error={errors.firstname}
                    name={"firstname"}
                    placeholder={"Prénom"}
                />
                <Input
                    label={"Email"}
                    value={user.email}
                    onChange={handleChange}
                    error={errors.email}
                    name={"email"}
                    placeholder={"Email"}
                />
                <Input
                    label={"Mot de passe"}
                    value={user.password}
                    onChange={handleChange}
                    error={errors.password}
                    name={"password"}
                    placeholder={"Mot de passe"}
                    type={"password"}
                />
                <Input
                    label={"Confirmation mot de passe"}
                    value={user.passwordConfirm}
                    onChange={handleChange}
                    error={errors.passwordConfirm}
                    name={"passwordConfirm"}
                    placeholder={"Confirmation du mot de passe"}
                    type={"password"}
                />
                <div className="form-group">
                    <button className="btn btn-success" type="submit">Se connecter</button>
                </div>
            </form>
        </>
    )

}

export default RegisterPage