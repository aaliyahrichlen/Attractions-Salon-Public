import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react'
import './NavBar.css';

const NavBar = () => {
    return (
        <div className="layout">
            <div className="header">
                {/* Logo */}
                <Link className="nav-logo" to="/">
                    <Header as='h1'>Attractions Salon</Header>
                </Link>
                {/* Page Links */}
                <div className="nav-items">
                    <Link className="nav-link" to='/Services'>Services</Link>
                    <Link className="nav-link" to='/About'>About</Link>
                    <Link className="nav-link" to='/Login'>Login</Link>
                </div>
            </div>
        </div>
    )
};

export default NavBar;
