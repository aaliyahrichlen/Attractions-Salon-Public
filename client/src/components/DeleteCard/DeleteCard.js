import React, { useState, useEffect } from 'react';
import fire from "../../views/Login/config/Fire";
import {storage} from "../../views/Login/config/Fire";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import 'bootstrap/dist/css/bootstrap.min.css';

function DeleteCard (props) {
    console.log(props.images.length);
       const DeleteCard = props.images.map((image) => {
        return (  
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={image.URL} />
        <Card.Body>
            <Card.Title></Card.Title>
            <Button id={image.name} onClick={props.handleChange} variant="primary" >Delete</Button>
        </Card.Body>
        </Card>
        );
        }  
    );
    return <div>{DeleteCard}</div>;
};

export default DeleteCard;