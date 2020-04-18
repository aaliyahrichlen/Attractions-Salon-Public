import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import { Responsive, Dropdown } from 'semantic-ui-react';
import './NavBar.css';
import fire from "../../views/Login/config/Fire";

/* import { AutoComplete } from 'material-ui';
 */

const NavBar = (props) => {
    const [userName,setUserName] = useState("");
    useEffect (() => {
        fire.auth().onAuthStateChanged(function(user) {
            if (user) {
                 var db = fire.database();
                var ref = db.ref();
                ref.on("value", function(userSnapshot) {
                    userSnapshot.forEach(function(snapshot) {
                        if(user.email === snapshot.child("email").val()){
                            setUserName(snapshot.child("firstName").val() + " " + snapshot.child("lastName").val());
                        }
                    });
                });
            } else {
            }
          }); 
    }, [])
    const logout = () => {
        fire.auth().signOut();
    }
    let bar;
    if(props.loggedIn === true && userName !== "admin lname")
    {
        bar =<div className="layout">
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
            <Link className="nav-link" to ='/Login'onClick={logout}>Logout</Link>
            <Link className="nav-link" to ='/Login'>{"Welcome"} {userName}</Link>
            
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
                        <Link className="nav-link" to ='/Login'>Logout</Link>
                        <Link className="nav-link" to='/Logout'>Logout</Link>

                    </Dropdown.Menu>
                </Dropdown>
                {/* Logo */}
                <Link id='logo' className="nav-logo" to="/">
                    <Image src='/images/logo.png' size='small' />
                </Link>
            </div>
        </Responsive>
        
</div>
    }
    else
    {
        bar =<div className="layout">
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
                    </Dropdown.Menu>
                </Dropdown>
                {/* Logo */}
                <Link id='logo' className="nav-logo" to="/">
                    <Image src='/images/logo.png' size='small' />
                </Link>
            </div>
        </Responsive>
        
</div>
    }
    return (
        <div>
            {bar}
        </div>
    )
};

export default NavBar;
