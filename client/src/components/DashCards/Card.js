import React, { useState, useEffect } from 'react';
import fire from "../../views/Login/config/Fire";
import {storage} from "../../views/Login/config/Fire";
import "../../views/DeleteImage/DeleteImage.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
// import 'bootstrap/dist/css/bootstrap.min.css';
// src={props.change && props.URL}
function DCard (props) {
    return (
        <div className="item">
        <Card className="card" style={{ width: '18rem', align: "center", height: "200px" }}>
        <Card.Img id={props.id} className="card-img-top" style={{height: "200px" }} variant="top" src={props.URL} />
        {/* <Image src={props.URL} fluid /> */}
        {/* style={{height: "150px" }} */}
        </Card>
        </div> 
    );
};

export default DCard;