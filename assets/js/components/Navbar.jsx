import React from "react";
import {Link} from "react-router-dom";
import AuthAPI from "../services/AuthAPI";
import {Navigate} from 'react-router-dom'
import {toast} from "react-toastify";

const Navbar = ({isAuthenticated, setIsAuthenticated}) => {

    const handleClick = async (event) => {
        event.preventDefault()
        await AuthAPI.logout();
        setIsAuthenticated(false)
        toast.success("Vous êtes désormais déconnecté", {
            theme: "colored"
        })
        return <Navigate to="/login" replace />
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <a className="navbar-brand" href="#">LightCRM</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/customers">Clients</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/invoices">Factures</Link>
                        </li>
                        {/*{isAuthenticated && (*/}
                        {/*    <>*/}
                        {/*        <li className="nav-item">*/}
                        {/*            <Link className="nav-link" to="/customers">Clients</Link>*/}
                        {/*        </li>*/}
                        {/*        <li className="nav-item">*/}
                        {/*            <Link className="nav-link" to="/invoices">Factures</Link>*/}
                        {/*        </li>*/}
                        {/*    </>*/}
                        {/*)}*/}
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        {!isAuthenticated && (
                            <>
                                <li className="nav-item me-2">
                                    <Link className="btn btn-success" to="/login">Connexion</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-secondary" to="/register">Incscription</Link>
                                </li>
                            </>
                        )}
                        {isAuthenticated && <li>
                            <a href="#" onClick={handleClick} className="btn btn-danger">Se déconnecter</a>
                        </li>}
                    </ul>
                </div>
            </div>
        </nav>
    );
}


export default Navbar