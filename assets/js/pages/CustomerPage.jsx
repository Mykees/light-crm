import React, {useEffect, useState} from "react";
import Input from "../components/form/Input";
import {useParams,useNavigate} from "react-router-dom";
import CustomersAPI from "../services/customersAPI";
import {toast} from "react-toastify";
import FormLoader from "../components/loaders/FormLoader";

const CustomerPage = (props) => {
    const navigate = useNavigate();
    const params = useParams()
    const id = params.id
    const [loading, setLoading] = useState(true)
    const [customer, setCustomer] = useState({
        lastname:"",
        firstname: "",
        email: "",
        company:""
    })

    const [errors, setErrors] = useState({
        lastname:"",
        firstname: "",
        email: "",
        company:""
    })

    const [editing, setEditing] = useState(false)

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget
        setCustomer({...customer, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            if(editing){
                await CustomersAPI.update(id, customer)
                toast.success("Le client à bien été édité", {theme: "colored"})
            }else{
                await CustomersAPI.create(customer)
                toast.success("Le client à bien été créé", {theme: "colored"})
            }
            setErrors({})

            navigate("/customers")

        }catch (error) {
            if(error.response.data.violations){
                const apiErrors = {}
                error.response.data.violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message
                })
                setErrors(apiErrors)
                toast.error("Veuillez corrigé vos erreurs", {theme: "colored"})
            }
        }
    }

    const fetchCustomer = async (id) => {
        try {
             const data = await CustomersAPI.find(id)
             setCustomer({
                 lastname: data.lastname,
                 firstname: data.firstname,
                 email: data.email,
                 company: data.company,
             })
            setLoading(false)
        }catch (error) {
            console.log(error.response.statusText)
            toast.error("Le client n'a pas pu être chargé", {theme: "colored"})
        }
    }

    useEffect(() => {
        if( id !== "new") {
            setEditing(true)
            fetchCustomer(id)
        }
    },[id])

    return (
        <>
            {!editing && <h1>Ajouter un nouveau client</h1> || <h1>Modification d'un client</h1>}

            {(loading && editing) && <FormLoader/> || <form onSubmit={handleSubmit}>
                <Input
                    label={"Nom"}
                    value={customer.lastname}
                    onChange={handleChange}
                    error={errors.lastname}
                    name={"lastname"}
                    placeholder={"Nom"}
                />
                <Input
                    label={"Prénom"}
                    value={customer.firstname}
                    onChange={handleChange}
                    error={errors.firstname}
                    name={"firstname"}
                    placeholder={"Prénom"}
                />
                <Input
                    label={"Email"}
                    value={customer.email}
                    onChange={handleChange}
                    error={errors.email}
                    name={"email"}
                    placeholder={"Email"}
                />
                <Input
                    label={"Entreprise"}
                    value={customer.company}
                    onChange={handleChange}
                    error={errors.company}
                    name={"company"}
                    placeholder={"Entreprise"}
                />

                <button type={"submit"} className="btn btn-success">Sauvegarder</button>
            </form>}
        </>
    )
}


export default CustomerPage