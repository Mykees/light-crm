import React,{useEffect,useState} from "react";
import Pagination from "../components/Pagination";
import CustomersAPI from "../services/customersAPI";

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

    // On récupère la valeur du champ de recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value)
        setCurrentPage(1)
    }
    //Filtre des données par rapport à la recherche
    const filteredCustomers = customers.filter( c =>
        c.firstname.toLowerCase().includes(search.toLowerCase()) ||
        c.lastname.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    )
    //On liste les données selon le filtre
    const paginatedCustomers = Pagination.getData(filteredCustomers,currentPage,itemsPerPage)

    return (
        <>
            <h1 className={"my-5"}>List des Clients</h1>

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

            {itemsPerPage < filteredCustomers.length && <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsPerPage={itemsPerPage}
                length={filteredCustomers.length}/>}
        </>
    )
}

export default CustomersPage