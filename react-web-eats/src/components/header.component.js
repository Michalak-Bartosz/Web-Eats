import React from 'react';
import { Link } from 'react-router-dom'
import './header.css';


const Header = ({ userName, isLoggedIn, onLogout }) => (
    <nav className="navbar navbar-custom">
        <div className="container">
            <Link className="navbar-brand" to="/">
                <div className="d-flex align-items-center">
                    <i className="fas fa-utensils fa-2x"></i>
                    <span className="h4">Web Eats</span>
                </div>
            </Link>
            {isLoggedIn &&
                <h2 className="mr-auto mt-auto mr-4">
                    <span className="badge badge-pill badge-secondary text-capitalize">
                        Welcome {userName} !
                    </span>
                </h2>}
            {isLoggedIn &&
                <button type="button" onClick={onLogout} className="btn btn-outline-warning">
                    Logout | <i className="fas fa-door-open"></i>
                </button>}
        </div>
    </nav>
);

export default Header;