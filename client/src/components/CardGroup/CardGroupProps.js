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
import {storage} from "../../views/Login/config/Fire";
import {db} from "../../views/Login/config/Fire";


const CardGroupProps = (props) => {
    const [nameArray, setNameArray] = useState([]);
    const [priceArray, setPriceArray] = useState([]);
    const [descriptionArray, setDescriptionArray] = useState([]);
    const [cardNumber, setCardNumber] = useState(0);
    const [imagesURL, setImagesURL] = useState([]);
	const [picturesArray, setPicturesArray] = useState([]); 
    const [category, setCategory] = useState([]);

    var price = 'Starting price: ';

    useEffect(() => {
        setCardNumber(nameArray.length)
     },[nameArray]);

     useEffect(() =>{

		var storageRef = storage.ref();
		var listRef = storageRef.child('images/services/');
		listRef.listAll().then(function(res) {
		res.items.forEach(function(itemRef) {
			var singleUrl = itemRef.getDownloadURL().then(function(url){
				setImagesURL(imagesURL => imagesURL.concat(url));
			});
			// All the items under listRef.
			//set state = res.items
		});
		}).catch(function(error) {
			console.log(error);// Uh-oh, an error occurred!
		});

	},[]);
 
    useEffect(() => {



        var db = fire.database();
        var ref = db.ref("text/services");
        ref.on("value", function(userSnapshot) {
            setDescriptionArray([]);
            setNameArray([]);
            setPriceArray([]);
            setCategory([]);

            userSnapshot.forEach(function(snapshot) {
                setNameArray(nameArray => nameArray.concat(snapshot.child("name").val()));
                setPriceArray(priceArray => priceArray.concat(snapshot.child("price").val()));
                setDescriptionArray(descriptionArray => descriptionArray.concat(snapshot.child("description").val()));
                setCategory(category => category.concat(snapshot.child("category").val()));

            });
        });
    

    },[]);

 
    var items = []
    for (let i = 0; i < cardNumber; i++) 
    {
        if(String(category[i])=== (props.category)){

        items.push(
        {
            header: nameArray[i],
            color: 'pink',
            image: imagesURL[i],
            description: descriptionArray[i],
            extra: price + priceArray[i],
            key: i

        }
        );
    }
}
    return (
        <div className="cards">
            <Card.Group centered
                items={items}/>
        </div>
    );
}

export default CardGroupProps
