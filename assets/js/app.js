/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
import React, {useEffect, useState} from "react"
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
import InvoicePage from "./pages/InvoicePage";
import LoginPage from "./pages/LoginPage";
import AuthAPI from "./services/AuthAPI";
import {Navigate} from 'react-router-dom';
import CustomerPage from "./pages/CustomerPage";
import RegisterPage from "./pages/RegisterPage";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import CustomersPagePaginate from "./pages/CustomersPagePaginate";

const PrivateRoute = ({isAuthenticated, children}) => {
    if( !isAuthenticated ) {
        return <Navigate to="/login" replace />
    }
    return children
}

const RedirectAuthenticated = ({isAuthenticated, children}) => {
    if( isAuthenticated ) {
        return <Navigate to="/" replace />
    }
    return children
}

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated())
    useEffect(() => {
        AuthAPI.isAuthenticated(setIsAuthenticated)
    }, [])

    return <>
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
        <div className="container my-5">
            <Routes>
                <Route path="/" element={<HomePage/>} />
                {/*<PrivateRoute2 path="/customers" element={<CustomersPage />} />*/}
                <Route path="/customers" element={<PrivateRoute isAuthenticated={isAuthenticated}><CustomersPage /></PrivateRoute>} />
                <Route path="/invoices" element={<PrivateRoute isAuthenticated={isAuthenticated}><InvoicesPage /></PrivateRoute>} />
                <Route path="/customers/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><CustomerPage /></PrivateRoute>} />
                <Route path="/invoices/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><InvoicePage /></PrivateRoute>} />
                <Route path="/login" element={<RedirectAuthenticated isAuthenticated={isAuthenticated}><LoginPage setIsAuthenticated={setIsAuthenticated}/></RedirectAuthenticated>} />
                <Route path="/register" element={<RedirectAuthenticated isAuthenticated={isAuthenticated}><RegisterPage setIsAuthenticated={setIsAuthenticated}/></RedirectAuthenticated>} />
            </Routes>
            <ToastContainer pauseOnFocusLoss={false} position={toast.POSITION.BOTTOM_LEFT}/>
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