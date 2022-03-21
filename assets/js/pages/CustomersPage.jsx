import React,{useEffect,useState} from "react";
import Pagination from "../components/Pagination";
import CustomersAPI from "../services/customersAPI";
import {Link} from "react-router-dom";

const CustomersPage = (props) => {
    const [customers, setCustomers] = useState([])
    const  [currentPage, setCurrentPage] = useState(1)
    const  [search, setSearch] = useState("")
    const itemsPerPage = 10

    //On récupère les customers
    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll()
            setCustomers(data)
        }catch (error) {
            console.log(error.response)
        }
    }
    //On supprimer un customer
    const handleDelete = async ( id ) => {
        if(confirm("Voulez-vous vraiment supprimer ce client ?")) {
            const initialCustomers = [...customers]
            setCustomers(customers.filter(customer => customer.id !== id))

            try {
                await CustomersAPI.delete(id)
            }catch (error) {
                setCustomers(initialCustomers)
                console.log(error.response)
            }

        }
    }

    //Récupération des customers au lancement
    useEffect(() => {
        fetchCustomers()
    }, [])

    //Calcul du montant total
    const totalAmount = (customer) => {
        return [customer.invoices.reduce((acc,obj) =>  acc + obj.amount , 0 )].toLocaleString()
    }

    // On récupère la valeur du champ de recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value)
        setCurrentPage(1)
    }
    //Filtre des données par rapport à la recherche
    const filteredCustomers = customers.filter( c =>
        c.firstname.toLowerCase().includes(search.toLowerCase()) ||
        c.lastname.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        totalAmount(c).includes(search.toLowerCase())
    )
    //On liste les données selon le filtre
    const paginatedCustomers = Pagination.getData(filteredCustomers,currentPage,itemsPerPage)
    //vertical-align: text-top;
    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1 className={"my-5"}>List des Clients</h1>

                <Link to={"/customers/new"} className={"btn btn-primary"}>Créer un client &nbsp;
                    <svg style={{"verticalAlign":"text-top"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    className="bi bi-person-plus-fill" viewBox="0 0 16 16"><path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/></svg>
                </Link>
            </div>

            <div className="form-group">
                <input type="text" onChange={handleSearch} className="form-control" value={search} placeholder={"Rechercher"}/>
            </div>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Client</th>
                        <th>Email</th>
                        <th>Entreprise</th>
                        <th>Factures</th>
                        <th>Montant total</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedCustomers && paginatedCustomers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td><a href="#">{customer.firstname} {customer.lastname}</a></td>
                            <td>{customer.email}</td>
                            <td>{customer.company}</td>
                            <td>{customer.invoices.length}</td>
                            <td>
                                {totalAmount(customer)}
                            </td>
                            <td>
                                <Link to={"/customers/"+customer.id} className={"btn btn-sm btn-primary me-1"}>
                                    Editer &nbsp;
                                    <svg style={{"verticalAlign":"text-top"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-pencil-fill" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg>
                                </Link>
                                <button
                                onClick={() => handleDelete(customer.id)}
                                disabled={customer.invoices.length > 0}
                                className="btn btn-sm btn-danger">
                                    Supprimer &nbsp;
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/></svg>
                                </button>
                            </td>
                        </tr>
                    ) )}
                </tbody>
            </table>

            {itemsPerPage < filteredCustomers.length && <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsPerPage={itemsPerPage}
                length={filteredCustomers.length}/>}
        </>
    )
}

export default CustomersPage