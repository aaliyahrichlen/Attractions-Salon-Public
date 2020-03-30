import React, { useState, useEffect } from 'react';
import fire from "../../views/Login/config/Fire";
import {storage} from "../../views/Login/config/Fire";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function AdminDashCard (props) {
        return (  
        <Card style={{ width: '14rem' }}>
        <Card.Img variant="top" src={props.URL} />
        <Card.Body>
            <Card.Title>Upload an image for your logo!</Card.Title>
            <input className="adButton" id="logos" type="file" onChange={props.handleChange}/>
            <Button onClick={props.handleUpload} variant="primary" >Upload</Button>
        </Card.Body>
        </Card>
        );
};

export default AdminDashCard;