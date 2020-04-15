import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Segment } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { Header, Responsive, Dropdown } from 'semantic-ui-react';
import './NavBar.css';
import { AutoComplete } from 'material-ui';


const NavBar = () => {
    return (
        <div className="layout">
                <Responsive {...Responsive.onlyComputer}>
                <div className="comp">
                {/* Logo */}
                <Link className="nav-logo" to="/">
                    <Image src='/images/logo.png' size='small' />
                </Link>
                {/* Page Links */}
                <div className="nav-items">
                    <Link className="nav-link" to='/Home'>Home</Link>
                    <Link className="nav-link" to='/Services'>Services</Link>
                    <Link className="nav-link" to='/About'>About Us</Link>
                    <Link className="nav-link" to='/Appointments'>Appointments</Link>
                    <Link className="nav-link" to='/Login'>Login</Link>
                    <Link className="nav-link" to='/Signup'>Signup</Link>
                </div>
                </div>
                </Responsive>
                <Responsive  {...Responsive.onlyMobile}>
                <div className="mobilebar">
                        <Dropdown id = 'dropdown'
                            Link
                            icon ='huge bars'
                        >
                            <Dropdown.Menu>
                                <Link className="nav-link" to='/Home'>Home</Link>
                                <Link className="nav-link" to='/Services'>Services</Link>
                                <Link className="nav-link" to='/About'>About Us</Link>
                                <Link className="nav-link" to='/Appointments'>Appointments</Link>
                                <Link className="nav-link" to='/Login'>Login</Link>
                                <Link className="nav-link" to='/Signup'>Signup</Link>
                            </Dropdown.Menu>
                        </Dropdown>
                        {/* Logo */}
                        <Link id='logo' className="nav-logo" to="/">
                            <Image src='/images/logo.png' size='small' />
                        </Link>
                    </div>
                </Responsive>
        </div>
    )
};

export default NavBar;
