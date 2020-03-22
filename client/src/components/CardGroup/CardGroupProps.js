import React, {useState, useEffect, useRef} from 'react';
import {Card} from 'semantic-ui-react'
import nails from './nails.jpg'
import curls from './curls.jpg'
import styling from './styling.jpg'
import stock from './stock.jpg'
import curls2 from './curls2.jpg'
import stock2 from './stock2.jpg'
import './CardGroupProps.css';
import fire from "../../views/Login/config/Fire";


const CardGroupProps = () => {
    const [serviceName1, setServiceName1] = useState('');
    const [nameArray, setNameArray] = useState([]);
    useEffect(() => {
        var db = fire.database();
        var ref = db.ref("text/services");
        ref.on("value", function(userSnapshot) {
            userSnapshot.forEach(function(snapshot) {
                setNameArray(nameArray => nameArray.concat(snapshot.child("name").val()));
            
            });
        });
    },[]);
    console.log(nameArray);

 
    var items = [
        {
            header: nameArray[0],
            description: 'Get your nails done!',
            meta: 'Starting price: ',
            color: 'pink',
            image: nails
        },
        {
            header: nameArray[1],
            description: 'Curl your hair!',
            meta: 'Starting price: ',
            color: 'pink',
            image: curls
        },
        {
            header: nameArray[2],
            description: 'ok',
            meta: '3 ',
            color: 'pink',
            image: curls
        }
 
    ]
    return (
        <div className="cards">
            <Card.Group centered
                items={items}/>
        </div>
    );
}

export default CardGroupProps
