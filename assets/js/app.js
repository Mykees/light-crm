/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
import React from "react"
import ReactDom from "react-dom"
// any CSS you import will output into a single css file (app.css in this case)
import './../css/app.css';

// start the Stimulus application
import './../bootstrap';
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { render } from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import CustomersPage from "./pages/CustomersPage";
import InvoicesPage from "./pages/InvoicesPage";
// import CustomersPagePaginate from "./pages/CustomersPagePaginate";

const App = () => {
    return <>
        <Navbar/>
        <div className="container my-5">
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/customers" element={<CustomersPage />} />
                <Route path="/invoices" element={<InvoicesPage/>} />
            </Routes>
        </div>
    </>
}

const rootElement = document.querySelector('#app')
render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    rootElement
);