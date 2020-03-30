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
    const [descriptionArray, setDescriptionArray] = useState([]);


    var price = 'Starting price: ';
    useEffect(() => {
        var db = fire.database();
        var ref = db.ref("text/services");
        ref.on("value", function(userSnapshot) {
            userSnapshot.forEach(function(snapshot) {
                setDescriptionArray(descriptionArray => descriptionArray.concat(snapshot.child("description").val()));
                setNameArray(nameArray => nameArray.concat(snapshot.child("name").val()));
                setPriceArray(priceArray => priceArray.concat(snapshot.child("price").val()));
            });
        });
    },[]);

 
    var items = [
        {
            header: nameArray[0],
            meta: price + priceArray[0],
            color: 'pink',
            image: nails,
            description: String(descriptionArray[0]),
            key: 1

        },
        {
            header: nameArray[1],
            meta: price + priceArray[1],
            color: 'pink',
            image: curls,
            description: String(descriptionArray[1]),
            key: 2

        },
        {
            header: nameArray[2],
            meta: price + priceArray[2],
            color: 'pink',
            image: styling,
            description: String(descriptionArray[2]),
            key: 3


        },
        {
            header: nameArray[3],
            meta: price + priceArray[3],
            color: 'pink',
            image: curls2,
            description: String(descriptionArray[3]),
            key: 4


        },
        {
            header: nameArray[4],
            description: "5",
            meta: price + priceArray[4],
            color: 'pink',
            image: stock2,
            description: String(descriptionArray[4]),
            key: 5


        },
        {
            header: nameArray[5],
            description: "6",
            meta: price + priceArray[5],
            color: 'pink',
            image: stock,
            description: String(descriptionArray[5]),
            key: 6


        },
        {
            header: nameArray[6],
            description: "9",
            meta: price + priceArray[6],
            color: 'pink',
            image: curls2,
            description: String(descriptionArray[6]),
            key: 7


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
