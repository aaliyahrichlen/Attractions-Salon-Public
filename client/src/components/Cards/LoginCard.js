import React, { useState, useEffect } from 'react';
import fire from "../../views/Login/config/Fire";
import {storage} from "../../views/Login/config/Fire";
import Card from 'react-bootstrap/Card';
import woman from "./woman-1.png";
import man from "./man-1.png";
import "./LoginCard.css";
import { Dimmer, Segment, Header, Icon, Image, Button } from 'semantic-ui-react'
function LoginCard (props) {
    const[active, setActive] = useState(false)
  
    const handleShow = () => {
        setActive(true);
    }

    const handleHide = () => {
        setActive(false);
    }
    
    
    return ( 
    <div className="loginCardCenter">
        <div class="ui card ">
            <div class="image">
            <Dimmer.Dimmable as={Image} dimmed={active} onMouseEnter={handleShow} onMouseLeave={handleHide}>
                <img src={man}/>
                <Dimmer active={active}>
                    <Header as='h2' icon inverted>
                    <Icon name='heart' />
                    Dimmed Message!
                    </Header>
                </Dimmer>
                </Dimmer.Dimmable>
            </div>
            <div class="content">
                <a class="header">{props.name}</a>
                <div class="body">Email: {props.email}</div>
                <div class="meta">
                    
                    {/* <span class="date">Joined in 2013</span> */}
                </div>
                {/* <div class="description">
                    Kristy is an art director living in New York.
                </div> */}
            </div>
            <div class="extra content">
                <a>
                    <button class="ui primary button" onClick = {props.logout}>Logout</button>
                </a>
            </div>   
        </div>
    </div>     
    );
};

export default LoginCard;