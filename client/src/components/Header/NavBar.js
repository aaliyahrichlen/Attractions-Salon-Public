import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { Header } from 'semantic-ui-react';
import './NavBar.css';

const NavBar = () => {
    return (
        <div className="layout">
            <div className="header">
                {/* Logo */}
                <Link className="nav-logo" to="/">
                    <Image src='/images/logo.png' size='small' />
                </Link>
                {/* Page Links */}
                <div className="nav-items">
                    <Link className="nav-link" to='/Services'>Services</Link>
                    <Link className="nav-link" to='/About'>About</Link>
                    <Link className="nav-link" to='/Login'>Login</Link>
                    <Link className="nav-link" to='/Signup'>Signup</Link>
                </div>
                <div className="info">
                    <h4 className="address">Address: 4509 NW 23 Ave, Gainesville, FL 32606
                        <br /> Phone: (352) 376-6008</h4>

                </div>
            </div>
        </div>
    )
};

export default NavBar;
