import React from "react";
import {Link} from "react-router-dom";

const Navbar = (props) => {
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
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item me-2">
                            <a href="#" className="btn btn-success">Connexion</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="btn btn-secondary">Inscription</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}


export default Navbar