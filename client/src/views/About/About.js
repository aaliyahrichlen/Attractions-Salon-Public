import React, {useEffect, useState} from 'react';
import './About.css';
import salonImg from './salon.jpg'
import {storage} from "../../views/Login/config/Fire";
import fire from "../Login/config/Fire";
import Footer from "../../components/Footer/Footer";
import SlideShow from "../../components/SlideShow/SlideShow";
import Review from "../../components/ReviewSection/Review";
function About() {
    const [imagesURL, setImagesURL] = useState([]);
    const [text, setText] = useState("");
    useEffect(() =>{

		var storageRef = storage.ref();
		var listRef = storageRef.child('images/about/');
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
        
        var db = fire.database();
        var ref = db.ref("text/about");
        ref.on("value", function(snapshot) {
                setText(snapshot.val());
        });

	},[]);
    return (
        <div>
            <div className="wholeFlex">
            <div className="topFlex">
            <div className="slideshowContainer">
            <SlideShow/>
            </div>
            <div className="textContainer">
            <div className="headText">
                Attractions Salon
            </div>
            <div className="textFormat">
                {text}
            </div>
            </div>
            
        </div>
        <div className="reviewComp">
        <Review/>
        </div>
        </div>
        <Footer/>
        </div>

    );
}

export default About;