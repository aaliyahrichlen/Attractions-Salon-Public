import React, {useState, useEffect} from 'react';
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
    const [serviceName1, setServiceName1] = useState(null);

    useEffect(() => {
        var db = fire.database();
        var ref = db.ref("text/services/service1/name");
        ref.on('value', snapshot => {
            var name1 = snapshot.val();
            setServiceName1(name1);
        });
    });

    const items = [
        {
            header: serviceName1,
            description: 'Get your nails done!',
            meta: 'Starting price: ',
            color: 'pink',
            image: nails
        },
        {
            header: 'Curls',
            description: 'Curl your hair!',
            meta: 'Starting price: ',
            color: 'pink',
            image: curls
        },
        {
            header: 'Styling',
            description: 'Style your hair!',
            meta: 'Starting price: ',
            color: 'pink',
            image: styling
        },
        {
            header: 'Styling',
            description: 'Style your hair!',
            meta: 'Starting price: ',
            color: 'pink',
            image: stock
        }, {
            header: 'Styling',
            description: 'Style your hair!',
            meta: 'Starting price: ',
            color: 'pink',
            image: stock2
        }, {
            header: 'Styling',
            description: 'Style your hair!',
            meta: 'Starting price: ',
            color: 'pink',
            image: curls2
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
