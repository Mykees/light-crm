import React, {useEffect, useState} from "react";
import InvoicesAPI from "../services/invoicesAPI";
import moment from "moment";
import Pagination from "../components/Pagination";
import CustomersAPI from "../services/customersAPI";

const InvoicesPage = (props) => {
    const [invoices, setInvoices] = useState([])
    const  [currentPage, setCurrentPage] = useState(1)
    const  [search, setSearch] = useState("")
    const itemsPerPage = 10
    const fetchInvoices = async () => {
        try {
            const data = await InvoicesAPI.findAll()
            setInvoices(data)
        }catch (error) {
            console.log(error.response)
        }
    }
    const handleDelete = async ( id ) => {
        if(confirm("Voulez-vous vraiment supprimer cette facture ?")) {
            const initialInvoices = [...invoices]
            setInvoices(invoices.filter(invoice => invoice.id !== id))

            try {
                await InvoicesAPI.delete(id)
            }catch (error) {
                setInvoices(initialInvoices)
                console.log(error.response)
            }
        }
    }
    const formatDate = (date) => {
        return new Intl.DateTimeFormat('fr-FR', {
            month: 'long',
            day: '2-digit',
            year: 'numeric',
        }).format(new Date(date))
    }

    const status = (status) => {
        if (status === 'PAID') {
            return 'badge bg-success'
        }else if(status === 'CANCELLED') {
            return 'badge bg-warning'
        } else {
            return 'badge bg-info'
        }
    }

    useEffect(() => {
        fetchInvoices()
    }, [])

    const filteredInvoices = invoices.filter( i =>
        i.customer.firstname.toLowerCase().includes(search.toLowerCase()) ||
        i.customer.lastname.toLowerCase().includes(search.toLowerCase()) ||
        i.customer.email.toLowerCase().includes(search.toLowerCase()) ||
        formatDate(i.sentAt).toLowerCase().includes(search.toLowerCase()) ||
        i.status.toLowerCase().includes(search.toLowerCase())
    )
    const PaginatedInvoices = Pagination.getData(filteredInvoices,currentPage,itemsPerPage)
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value)
        setCurrentPage(1)
    }
    return (
        <>
            <h1 className={"my-5"}>Liste des factures</h1>

            <div className="form-group">
                <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher"/>
            </div>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Numéro</th>
                        <th>Client</th>
                        <th>Date d'envoi</th>
                        <th>Status</th>
                        <th>Montant</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                {PaginatedInvoices && PaginatedInvoices.map((invoice) => (
                    <tr key={invoice.id}>
                        <td>{invoice.chrono}</td>
                        <td><a href="#">{invoice.customer.firstname} {invoice.customer.lastname}</a></td>
                        <td>{formatDate(invoice.sentAt)}</td>
                        <td>
                            {<span className={status(invoice.status)}>{invoice.status}</span>}
                        </td>
                        <td>{invoice.amount.toLocaleString()} €</td>
                        <td>
                            <button className="btn btn-sm btn-primary me-1">Editer</button>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(invoice.id)}>Supprimer</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {itemsPerPage < filteredInvoices.length && <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsPerPage={itemsPerPage}
                length={filteredInvoices.length}/>}
        </>
    )
}


export default InvoicesPage