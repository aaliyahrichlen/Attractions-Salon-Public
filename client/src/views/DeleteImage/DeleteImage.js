import React, { useState, useEffect } from 'react';
import fire from "../Login/config/Fire";
import {storage} from "../Login/config/Fire";
import "../AdminDash/AdminDash.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteCard from "../../components/Cards/DeleteCard";
const DeleteImage = () => { 

    const [images, setImages] = useState([]);
    const[deleteImage, setDeleteImage] = useState(null);
    const [LogoImages, setLogoImages] = useState([]);
    const [servicesImages, setServicesImages] = useState([]);
    const [aboutImages, setAboutImages] = useState([]);
    var storageRef = storage.ref();
    var listRef = storageRef.child('images/slideshow/'); //this should change later to a folder variable
    var listRefLogos = storageRef.child('images/logos/'); 
    var listRefServices = storageRef.child('images/services/'); 
    var listRefAbout = storageRef.child('images/about/'); 

    var referenceArray = [listRef, listRefLogos, listRefServices, listRefAbout];
    var imageArray = [setImages, setLogoImages, setServicesImages, setAboutImages];
    var imageIDArray = ["/slideshow/", "/logos/", "/services/", "/about/"];

	useEffect(() =>{
        referenceArray.map((reference, count)=>{
            reference.listAll().then(function(res) {
                res.items.forEach(function(itemRef) {
                    var singleUrl = itemRef.getDownloadURL().then(function(url){
                        imageArray[count](Logoimages => Logoimages.concat({
                            name: imageIDArray[count] + itemRef.name,
                            URL: url
                        }));
                    });
                });
                }).catch(function(error) {
                    console.log(error);// Uh-oh, an error occurred!
                });
        })
    
    },[]); //I think this changes twice because first it gets set and then updated when I press the button
    
    
    const logout = () => {
        fire.auth().signOut();
    }

    const handleChange = (delImage)=>{
        var desertRef = storageRef.child(`images${delImage.target.id}`)
        desertRef.delete().then(function() {
          }).catch(function(error) {
            console.log(error);
          });
          if(delImage.target.id.includes("/logos")){
            setLogoImages(LogoImages.filter(image => image.name.toLowerCase().indexOf(delImage.target.id.toLowerCase()) === -1));
          }else if(delImage.target.id.includes("/slideshow")){
            setImages(images.filter(image => image.name.toLowerCase().indexOf(delImage.target.id.toLowerCase()) === -1));
          }else if(delImage.target.id.includes("/services")){
            setServicesImages(servicesImages.filter(image => image.name.toLowerCase().indexOf(delImage.target.id.toLowerCase()) === -1));
          }else if(delImage.target.id.includes("/about")){
            setAboutImages(aboutImages.filter(image => image.name.toLowerCase().indexOf(delImage.target.id.toLowerCase()) === -1));
          }
        setDeleteImage(delImage.target.id);
    }
    
    
    return (
    <div className="pinkBackground">
        <div>
            <h1>Welcome to Home</h1>
            <button onClick={logout}>Logout</button>
        </div>
        <div className="rowDelete">
            <div className="largecolumnDelete">
                <div className="pink-columnDelete">
                <h2 class="centeraligned">Delete photos from Slideshow folder!</h2>
                <DeleteCard images = {images}
                handleChange = {handleChange}/>
                <br/>
                <h2 class="centeraligned">Delete photos from Logos folder!</h2>
                <div class="wrapper">
                <DeleteCard images = {LogoImages}
                handleChange = {handleChange}/>
                </div>
                <br/>
                <h2 class="centeraligned">Delete photos from Services folder!</h2>
                <DeleteCard images = {servicesImages}
                handleChange = {handleChange}/>
                <br/>
                <h2 class="centeraligned">Delete photos from About folder!</h2>
                <DeleteCard images = {aboutImages}
                handleChange = {handleChange}/>
                </div>
            </div>
        </div>
    </div>
    );

};
export default DeleteImage;