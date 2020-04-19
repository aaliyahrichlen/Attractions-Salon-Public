import React, { useState, useEffect } from 'react';
import fire from "../../views/Login/config/Fire";
import {storage} from "../../views/Login/config/Fire";
import Card from 'react-bootstrap/Card';
import woman from "./woman-1.png";
import man from "./man-1.png";
import "./LoginCard.css";
import { Modal } from 'react-bootstrap';
import { Dimmer, Segment, Header, Icon, Image, Button } from 'semantic-ui-react'
function LoginCard (props) {
    const[active, setActive] = useState(false)
    const[modalShow, setModalShow] = useState(false);
    
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
                <img src={woman}/>
                <Dimmer active={active}>
                    <Header as='h2' icon inverted>
                        <br/>
                    <Button onClick={() => setModalShow(true)} >update password</Button>
                    <MyVerticallyCenteredModal
                        show = {modalShow}
                        onHide={() => setModalShow(false)}
                    />
                    {/* <Button>Upload userPhoto</Button> */}
                    {/* <Icon name='id badge outline' /> */}
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

    function MyVerticallyCenteredModal(props) {
        const[newPassword, setNewPassword] = useState('');
        const updatePassword = () => {
            var userObj = fire.auth().currentUser;
            userObj.updatePassword(newPassword).then(function() {
                props.onHide();
                alert("Your password has been successfully changed!");
            }).catch(function(error) {
                alert(error);// An error happened.
            });
            
        }
        return (
        <Modal
            {...props}
            size="med"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Update Password
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <h4>Enter your new password</h4>
            <div class="password">
                <input name="password" id="password" type="password" value={newPassword}
                onChange={event => setNewPassword(event.target.value)} placeholder="Password" class="input"/>
            </div>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={updatePassword}>Save</Button>
            <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
        );
  }
};



export default LoginCard;