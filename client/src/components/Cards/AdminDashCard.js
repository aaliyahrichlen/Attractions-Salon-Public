import React, { useState, useEffect } from 'react';
import fire from "../../views/Login/config/Fire";
import {storage} from "../../views/Login/config/Fire";
import "../../views/AdminDash/AdminDash.css";
//import Button from 'react-bootstrap/Button';
import Button from '@material-ui/core/Button';
import Card from 'react-bootstrap/Card';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { grey } from '@material-ui/core/colors';
import './LoginCard.css';

function AdminDashCard (props) {
    return (
        <div align="center">
        <Card>
        <Card className="cardMax" style={{align: "center"}} >
            <Card.Img variant="top" src={props.URL} />
        </Card>
            <Card.Body>
                <Card.Title class="admHead">Upload an image for your {props.nameOfService}!</Card.Title>
                <Card.Text>
                </Card.Text>
                { props.showValue && <progress value={props.progressBar} max="100"/>} 
                <input id={props.id} type="file" onChange={props.handleChange}/>
                <Button variant="contained" id='1' color="default" size="large" startIcon={<CloudUploadIcon />} className="buf" size="small" onClick = {props.handleUpload} >Upload</Button>
            </Card.Body>
        </Card>
        </div>
    );
 };

export default AdminDashCard;