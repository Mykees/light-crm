import React, {useEffect, useState} from "react";
import InvoicesAPI from "../services/invoicesAPI";
import moment from "moment";
import Pagination from "../components/Pagination";
import {Link} from "react-router-dom";

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
            <div className="d-flex justify-content-between align-items-center">
                <h1 className={"my-5"}>List des factures</h1>

                <Link to={"/invoices/new"} className={"btn btn-primary"}>Créer une facture &nbsp;
                    <svg style={{"verticalAlign":"text-top"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-file-pdf-fill" viewBox="0 0 16 16">
                        <path d="M5.523 10.424c.14-.082.293-.162.459-.238a7.878 7.878 0 0 1-.45.606c-.28.337-.498.516-.635.572a.266.266 0 0 1-.035.012.282.282 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548zm2.455-1.647c-.119.025-.237.05-.356.078a21.035 21.035 0 0 0 .5-1.05 11.96 11.96 0 0 0 .51.858c-.217.032-.436.07-.654.114zm2.525.939a3.888 3.888 0 0 1-.435-.41c.228.005.434.022.612.054.317.057.466.147.518.209a.095.095 0 0 1 .026.064.436.436 0 0 1-.06.2.307.307 0 0 1-.094.124.107.107 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256zM8.278 4.97c-.04.244-.108.524-.2.829a4.86 4.86 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.517.517 0 0 1 .145-.04c.013.03.028.092.032.198.005.122-.007.277-.038.465z"/><path fillRule="evenodd"d="M4 0h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm.165 11.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.64 11.64 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.856.856 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.844.844 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.76 5.76 0 0 0-1.335-.05 10.954 10.954 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.238 1.238 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a19.707 19.707 0 0 1-1.062 2.227 7.662 7.662 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103z"/>
                    </svg>
                </Link>
            </div>

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
                            <Link to={"/invoices/"+invoice.id} className={"btn btn-sm btn-primary me-1"}>
                                Editer &nbsp;
                                <svg style={{"verticalAlign":"text-top"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-pencil-fill" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg>
                            </Link>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(invoice.id)}>
                                Supprimer &nbsp;
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/></svg>
                            </button>
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