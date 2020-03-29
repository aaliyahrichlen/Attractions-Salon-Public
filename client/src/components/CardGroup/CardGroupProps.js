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
    const [nameArray, setNameArray] = useState([]);
    const [priceArray, setPriceArray] = useState([]);

    var price = 'Starting price: ';
    useEffect(() => {
        var db = fire.database();
        var ref = db.ref("text/services");
        ref.on("value", function(userSnapshot) {
            userSnapshot.forEach(function(snapshot) {
                setNameArray(nameArray => nameArray.concat(snapshot.child("name").val()));
                setPriceArray(priceArray => priceArray.concat(snapshot.child("price").val()));

            
            });
        });
    },[]);
 
    var items = [
        {
            header: nameArray[0],
            description: 'Get your nails done!',
            meta: price + priceArray[0],
            color: 'pink',
            image: nails
        },
        {
            header: nameArray[1],
            description: 'Curl your hair!',
            meta: price + priceArray[1],
            color: 'pink',
            image: curls
        },
        {
            header: nameArray[2],
            description: 'Style3',
            meta: price + priceArray[2],
            color: 'pink',
            image: curls
        },
        {
            header: nameArray[3],
            description: 'Service4',
            meta: price + priceArray[3],
            color: 'pink',
            image: nails
        },
        {
            header: nameArray[4],
            description: 'Service5',
            meta: price + priceArray[4],
            color: 'pink',
            image: curls
        },
        {
            header: nameArray[5],
            description: 'Service6',
            meta: price + priceArray[5],
            color: 'pink',
            image: curls
        },
        {
            header: nameArray[6],
            description: 'Service7',
            meta: price + priceArray[6],
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
