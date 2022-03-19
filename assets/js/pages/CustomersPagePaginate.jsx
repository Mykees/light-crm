import React,{useEffect,useState} from "react";
import axios from "axios";
import Pagination from "../components/Pagination";

const CustomersPagePaginate = (props) => {
    const [customers, setCustomers] = useState([])
    const  [currentPage, setCurrentPage] = useState(1)
    const  [totalItems, setTotalItems] = useState(0)
    const itemsPerPage = 10;


    const handleDelete = ( id ) => {
        if(confirm("Voulez-vous vraiment supprimer ce client ?")) {
            const initialCustomers = [...customers]

            setCustomers(customers.filter(customer => customer.id !== id))
            axios.delete("http://127.0.0.1:8001/api/customers/" + id)
                .catch(error => {
                    setCustomers(initialCustomers)
                    console.log(error.response)
                })
        }
    }

    useEffect(() => {
        axios.get(`http://127.0.0.1:8001/api/customers?pagination=true&itemsPerPage=${itemsPerPage}&page=${currentPage}`)
            .then(response => {
                setCustomers(response.data['hydra:member'])
                setTotalItems(response.data['hydra:totalItems'])
            })
            .catch(error => console.log(error.response))
    }, [currentPage])

    const paginatedCustomers = Pagination.getData(customers,currentPage,itemsPerPage)

    return (
        <>
            <h1 className={"my-5"}>List des Clients Pagination</h1>

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
                {customers && customers.map((customer) => (
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td><a href="#">{customer.firstname} {customer.lastname}</a></td>
                        <td>{customer.email}</td>
                        <td>{customer.company}</td>
                        <td>{customer.invoices.length}</td>
                        <td>
                            {[customer.invoices.reduce((acc,obj) =>  acc + obj.amount , 0 )].toLocaleString()}
                        </td>
                        <td><button
                            onClick={() => handleDelete(customer.id)}
                            disabled={customer.invoices.length > 0}
                            className="btn btn-sm btn-danger">Supprimer</button></td>
                    </tr>
                ) )}
                </tbody>
            </table>

            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsPerPage={itemsPerPage}
                length={totalItems}/>
        </>
    )
}

export default CustomersPagePaginate