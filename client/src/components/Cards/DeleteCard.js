import React, { useState, useEffect } from 'react';
import fire from "../../views/Login/config/Fire";
import {storage} from "../../views/Login/config/Fire";
import "../../views/DeleteImage/DeleteImage.css";
import Button from '@material-ui/core/Button';
import Card from 'react-bootstrap/Card';
import DeleteIcon from '@material-ui/icons/Delete';
// import 'bootstrap/dist/css/bootstrap.min.css';

function DeleteCard (props) {
    const DeleteCard = props.images.map((image) => {
     return (  

     <div className="item">
     <Card className="card" style={{ width: '250px', height: "250px" }}>
     <Card.Img className="card-img-top" style={{height: "150px" }}variant="top" src={image.URL} />
     <Card.Body className="d-flex flex-column ">
         <Card.Title></Card.Title>
        
     </Card.Body>
     <Card.Footer>
         <Button  id={image.name} onClick={props.handleChange} variant="contained" startIcon={<DeleteIcon />}>Delete</Button>
     </Card.Footer>
     </Card>
     <br/>
     </div>
     );
     }  
 );
 return <div className="deleteCardCont">{DeleteCard}</div>;
};

export default DeleteCard;