import React, {useEffect, useState} from "react";
import Input from "../components/form/Input";
import {useParams,useNavigate} from "react-router-dom";
import Select from "../components/form/Select";
import CustomersAPI from "../services/customersAPI";
import InvoicesAPI from "../services/invoicesAPI";


const InvoicePage = (props) => {
    const navigate = useNavigate();
    const params = useParams()
    const id = params.id
    const [invoice, setInvoice] = useState({
        amount:"",
        customer: "",
        status: "SENT",
    })
    const [errors, setErrors] = useState({
        amount:"",
        customer: "",
        status: "",
    })
    const status = {
        'PAID': 'PAYÉE',
        'SENT': 'ENVOYÉE',
        'CANCELLED': 'ANNULÉE'
    }
    const [customers, setCustomers] = useState([])
    const [editing, setEditing] = useState(false)
    /**
     * Récupération des valeurs des champs
     * @param currentTarget
     */
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget
        setInvoice({...invoice, [name]: value})
    }
    /**
     * Envoie des données soumis par le form
     * @param event
     * @returns {Promise<void>}
     */
    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            if(editing){
                await InvoicesAPI.update(id, {...invoice, customer:`/api/customers/${invoice.customer}`})
            }else{
                await InvoicesAPI.create({...invoice, customer:`/api/customers/${invoice.customer}`})
            }
            setErrors({})
            navigate("/invoices")
        }catch (error) {
            if(error.response.data.violations){
                const apiErrors = {}
                error.response.data.violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message
                })
                setErrors(apiErrors)
            }
        }
    }
    //On récupère les customers
    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll()
            await setCustomers(data)
            if(id === "new") {
                setInvoice({...invoice, customer: data[0].id})
            }
        }catch (error) {
            console.log(error.response)
        }
    }
    /**
     * Récupération de la facture
     * @param id
     * @returns {Promise<void>}
     */
    const fetchInvoice = async (id) => {
        try {
            const data = await InvoicesAPI.find(id)
            setInvoice({
                amount:data.amount,
                customer: data.customer.id,
                status: data.status,
            })
        }catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => {
        if( id !== "new") {
            setEditing(true)
            fetchInvoice(id)
        }
        fetchCustomers()
    },[id])

    return (
        <>
            {!editing && <h1>Ajouter une nouvelle facture</h1> || <h1>Modification d'une facture</h1>}
            <form onSubmit={handleSubmit}>
                <Input
                    label={"Montant"}
                    value={invoice.amount}
                    onChange={handleChange}
                    error={errors.amount}
                    name={"amount"}
                    placeholder={"Montant"}
                />
                <Select
                    label={"Client"}
                    value={invoice.customer}
                    onChange={handleChange}
                    error={errors.customer}
                    name={"customer"}
                >
                    <option value="">{"Selectionnez un client"}</option>
                    {customers.map((v) => {
                        return (
                            <option
                                key={v.id}
                                value={v.id}>
                                {v.firstname} {v.lastname}
                            </option>
                        )
                    })}
                </Select>
                <Select
                    label={"Status"}
                    value={invoice.status}
                    onChange={handleChange}
                    error={errors.status}
                    name={"status"}
                >
                    <option value="">{"Selectionnez un status"}</option>
                    {Object.entries(status).map((v) => {
                        return (
                            <option
                                key={v[0]}
                                value={v[0]}>
                                {v[1]}
                            </option>
                        )
                    })}
                </Select>

                <button className="btn btn-success" type={"submit"}>Sauvegarder</button>
            </form>
        </>
    )
}

export default InvoicePage