import React, { useState, useEffect } from 'react';
import fire from "../../views/Login/config/Fire";
import {storage} from "../../views/Login/config/Fire";
import "../../views/DeleteImage/DeleteImage.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import 'bootstrap/dist/css/bootstrap.min.css';

function DeleteCard (props) {
       const DeleteCard = props.images.map((image) => {
        return (  

        <div className="item">
        <Card className="card" style={{ width: '11rem', height: "250px" }}>
        <Card.Img className="card-img-top" style={{height: "150px" }}variant="top" src={image.URL} />
        <Card.Body className="d-flex flex-column ">
            <Card.Title></Card.Title>
           
        </Card.Body>
        <Card.Footer>
            <Button class="mt-auto" id={image.name} onClick={props.handleChange} variant="primary" >Delete</Button>
        </Card.Footer>
        </Card>
        </div>
        );
        }  
    );
    return <div class="wrapper">{DeleteCard}</div>;
};

export default DeleteCard;