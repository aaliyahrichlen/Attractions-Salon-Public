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
import {db} from "../../views/Login/config/Fire";


const CardGroupProps = () => {
    const [nameArray, setNameArray] = useState([]);
    const [priceArray, setPriceArray] = useState([]);
    const [descriptionArray, setDescriptionArray] = useState([]);
    const [cardNumber, setCardNumber] = useState(0);


    var price = 'Starting price: ';

    useEffect(() => {
        setCardNumber(nameArray.length)
     },[nameArray]);
     
 
    useEffect(() => {



        var db = fire.database();
        var ref = db.ref("text/services");
        ref.on("value", function(userSnapshot) {
            setDescriptionArray([]);
            setNameArray([]);
            setPriceArray([]);
            userSnapshot.forEach(function(snapshot) {
                setNameArray(nameArray => nameArray.concat(snapshot.child("name").val()));
                setPriceArray(priceArray => priceArray.concat(snapshot.child("price").val()));
                setDescriptionArray(descriptionArray => descriptionArray.concat(snapshot.child("description").val()));

            });
        });
    

    },[]);

 
    var items = []
    for (let i = 0; i < cardNumber; i++) 
    {
        items.push(
        {
            header: nameArray[i],
            color: 'pink',
            image: nails,
            description: descriptionArray[i],
            extra: price + priceArray[i],
            key: i

        }
        );
    }
    return (
        <div className="cards">
            <Card.Group centered
                items={items}/>
        </div>
    );
}

export default CardGroupProps
