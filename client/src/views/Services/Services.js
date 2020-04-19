import React, {useState, useEffect, useRef} from 'react';
import './Services.css';
import CardGroupProps from '../../components/CardGroup/CardGroupProps.js'
import Footer from "../../components/Footer/Footer";
import fire from "../../views/Login/config/Fire";
import {storage} from "../../views/Login/config/Fire";
import { Divider } from 'semantic-ui-react'

function Services() {
    const [nameArray, setNameArray] = useState([]);
    const [priceArray, setPriceArray] = useState([]);
    const [descriptionArray, setDescriptionArray] = useState([]);
    const [cardNumber, setCardNumber] = useState(0);
    const [imagesURL, setImagesURL] = useState([]);
    const [imageName, setImageName] = useState([]); 
	const [picturesArray, setPicturesArray] = useState([]); 
    const [category, setCategory] = useState([]);
    const [passedImage, setPassedImage] = useState([]);
    const[numServices, setNumServices] = useState(0);
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
                setImageName(image => image.concat(itemRef.name));
            });
		});
        }).catch(function(error) {
			console.log(error);// Uh-oh, an error occurred!
        });
 
    },[]);


    useEffect(()=>{
    //    console.log("Cardnumber: " + cardNumber);
    //     console.log(imageName.length);
         console.log(imagesURL);
         for (let i = 0; i < imageName.length; i++) 
         {
             imageName.map((image, a) => {
                if(image.indexOf(`Bucket${i}_`) === 0) {
                    console.log("i: " + i + " a: " + a);
                    setPassedImage(passedImage => passedImage.concat(imagesURL[a]));
                }
            })
        }
    }, [imageName.length === cardNumber]) //Need to find the length of carNumber
    
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

    return (
        <div >

            <Divider horizontal>
                Full Set
            </Divider>
            <CardGroupProps category={'Full Set'}
            imagesArray = {passedImage} />
            
            <Divider horizontal>
                Pedicure
            </Divider>
            <CardGroupProps category={'Pedicure'} 
            imagesArray = {passedImage} />
            
            <Divider horizontal>
                Manicure
            </Divider>
            <CardGroupProps category={'Manicure'} 
            imagesArray = {passedImage} />

            
            <Divider horizontal>
                Fill
            </Divider>
            <CardGroupProps category={'Fill'} 
            imagesArray = {passedImage} />

            
            <Divider horizontal>
                Polish
            </Divider>
            <CardGroupProps category={'Polish'} 
            imagesArray = {passedImage} />
        
        
            <Divider horizontal>
                Haircuts
            </Divider>
            <CardGroupProps category={'Haircuts'} 
            imagesArray = {passedImage} />

            <Divider horizontal>
                 Hair Styling
            </Divider>
            <CardGroupProps category={'Hair Styling'} 
            imagesArray = {passedImage} />

         <Divider horizontal>
                Hair Treatment
            </Divider>
            <CardGroupProps category={'Hair Treatment'} 
            imagesArray = {passedImage} />

           <Divider horizontal>
                Hair Extensions
            </Divider>
            <CardGroupProps category={'Hair Extensions'} 
            imagesArray = {passedImage} />

           <Divider horizontal>
                Hair Shampoo
            </Divider>
            <CardGroupProps category={'Hair Shampoo'} 
            imagesArray = {passedImage} />

            
           <Divider horizontal>
                Hair Coloring
            </Divider>
            <CardGroupProps category={'Hair Coloring'} 
            imagesArray = {passedImage} />

            
           <Divider horizontal>
                Wax
            </Divider>
            <CardGroupProps category={'Wax'} 
            imagesArray = {passedImage} />


            <Footer/>
        </div>
    );
}

export default Services;
