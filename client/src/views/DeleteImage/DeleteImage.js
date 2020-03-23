import React, { useState, useEffect } from 'react';
import fire from "../Login/config/Fire";
import {storage} from "../Login/config/Fire";
// import "./AdminDash.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteCard from "../../components/DeleteCard/DeleteCard";
const DeleteImage = () => { 
    const [image, setImage] = useState(null);
    const [folder, setFolder] = useState(null);

    const [images, setImages] = useState([]);
    // const [imagesURL, setImagesURL] = useState([]);
    // const [imageNames, setImageNames] = useState([]);

	const [picturesArray, setPicturesArray] = useState([]); 
    const[toggle, setToggle] = useState(false);

    const[page2, setPage2] = useState([]);
    const [page, setPage] = useState([]);
    const[deleteImage, setDeleteImage] = useState(null);
    const [Cardurl, setCardUrl] = useState([]);
    
    var storageRef = storage.ref();
    var listRef = storageRef.child('images/slideshow/'); //this should change later to a folder variable

	useEffect(() =>{
		//var listRef = storageRef.child(`images/${folder}/`);
		listRef.listAll().then(function(res) {
		res.items.forEach(function(itemRef) {
            // setImageNames(imageNames => imageNames.concat(itemRef.name));
            var singleUrl = itemRef.getDownloadURL().then(function(url){
                setImages(images => images.concat({
                    name: itemRef.name,
                    URL: url
                }));
				// setImagesURL(imagesURL => imagesURL.concat(url));
			});
		});
		}).catch(function(error) {
			console.log(error);// Uh-oh, an error occurred!
		});
    },[]); //I think this changes twice because first it gets set and then updated when I press the button
    

    // useEffect(() =>{
    //     console.log(images.length);
    //     console.log(picturesArray.length);
    //     picturesArray.map(picture => {
    //         console.log(picture.name + "\n");
    //     })
    //  }, [images, picturesArray])
    
    const logout = () => {
        fire.auth().signOut();
    }

    const handleChange = (delImage)=>{
        var desertRef = storageRef.child(`images/slideshow/${delImage.target.id}`)
        desertRef.delete().then(function() {
          }).catch(function(error) {
            console.log(error);
          });
        setImages(images.filter(image => image.name.toLowerCase().indexOf(delImage.target.id.toLowerCase()) === -1));
        setDeleteImage(delImage.target.id);
    }
    
    return (
        <div>
        <div>
            <h1>Welcome to Home</h1>
            <button onClick={logout}>Logout</button>
        </div>
        <div class="leftPage">      
        </div>
        <div className="rightPage">
        <h2>Delete photos from Logos!</h2>
        <DeleteCard images = {images}
        handleChange = {handleChange}/>
        </div>
    </div>
    );

};
export default DeleteImage;