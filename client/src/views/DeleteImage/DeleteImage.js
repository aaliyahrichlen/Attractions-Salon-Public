import React, { useState, useEffect } from 'react';
import fire from "../Login/config/Fire";
import {storage} from "../Login/config/Fire";
import "../AdminDash/AdminDash.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteCard from "../../components/Cards/DeleteCard";
import AdminDashCard from "../../components/Cards/AdminDashCard";
import SidebarNav from "../../components/DashSidebar/SidebarNav.js";
import EditAbout from "../AdminDash/EditAbout.js";
import "./DeleteImage.css"
import Divider from '@material-ui/core/Divider';

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


    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);
    const [progressBar, setProgressBar] = useState(0);
    const [show, setShow] = useState([false, false, false, false] );
    const [folder, setFolder] = useState(null);
    const [imagesURL, setImagesURL] = useState([]);
    const [imageNames, setImageNames] = useState([]);
    const [urlArray, setUrlArray] = useState([null, null, null, null]);
    const [nameArray, setNameArray] = useState([]);
    const [priceArray, setPriceArray] = useState([]);
    const [descArray, setDescArray] = useState([]);
    const [about, setAbout] = useState("");
    const [cardNumber, setCardNumber] = useState(0);
    

    const handleAddChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            setFolder(e.target.id);
        }
    };

    useEffect(() => {
        var db = fire.database();
        var ref = db.ref("text/about");
        ref.on("value", function(snapshot) {
                setAbout(snapshot.val());
        });
    },[]);

    useEffect(() => {
       setCardNumber(nameArray.length)
    },[nameArray]);
      

    useEffect(() => {
       
        var storageRef = storage.ref(`images/${folder}/`);
        // var listRef = storageRef.child(`images/${folder}/`);
        storageRef.listAll().then(function (res) {
            res.items.forEach(function (itemRef) {
                console.log(itemRef.name);
                setImageNames(imageNames => imageNames.concat(itemRef));
                var singleUrl = itemRef.getDownloadURL().then(function (url) {
                    setImagesURL(imagesURL => imagesURL.concat(url));
                });
            });
        }).catch(function (error) {
            console.log(error); // Uh-oh, an error occurred!
        });
    }, [folder]); // I think this changes twice because first it gets set and then updated when I press the button


    const handleUpload = (e) => {
        var fireRef = fire.database().ref("images");
        const uploadTask = storage.ref(`images/${folder}/${
            image.name
        }`).put(image);
        uploadTask.on("state_changed", snapshot => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgressBar(progress);
        }, error => {
            console.log(error);
        }, () => {
            storage.ref(`images/${folder}/`).child(image.name).getDownloadURL().then(url => {
                setUrl(url);
                if(folder === "logos"){
                    setUrlArray([url, null, null, null]);
                    setShow([true, false, false, false]);
                }else if(folder === "slideshow"){
                    setUrlArray([null, url, null, null]);
                    setShow([false, true, false, false]);
                }else if (folder === "services"){
                    setUrlArray([null, null, url, null]);
                    setShow([false, false, true, false]);
                }else if (folder === "about"){
                    setUrlArray([null, null, null, url]);
                    setShow([false, false, false, true]);
                }
                // writing to database prob: Duplicate entries!
                // var fireRef = fire.database().ref("images");
                // fireRef.push().set({
                //     name: image.name,
                //     URL: url
                // })
            })
        });
    };

    const handleAboutUpload = (e) => { 
        e.preventDefault();
        var db = fire.database();
        var ref = db.ref("text/about");
        ref.set(about);
    };


    const logout = () => {
        fire.auth().signOut();
    }

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
    <div id="App" className="pinkBackground">
        {/* <SidebarNav pageWrapId={"page-wrap"} outerContainerId={"App"} /> */}
        <div>
            {/* <div>
                <h1>Welcome to Home</h1>
                <button onClick={logout}>Logout</button>
            </div> */}
            <div className="rowDelete">
                <div className="largecolumnDelete">
                    <div className="pink-columnDelete">
                    <div className="headFont">Edit the About Us Page</div>
                    <div className="cardContainer">
                    <EditAbout/>
                    
                    <AdminDashCard
                    URL={urlArray[1]}
                    nameOfService="Slideshow"
                    showValue={show[1]}
                    progressBar={progressBar}
                    id="slideshow"
                    handleChange={handleAddChange}
                    handleUpload={handleUpload}/>
                    
                    </div>
                    <DeleteCard images = {images}
                    handleChange = {handleChange}/>

                    {/* <EditSlideshow
                    URL={urlArray[1]}
                    showValue={show[1]}
                    progressBar={progressBar}
                    handleAddChange={handleAddChange}
                    handleUpload={handleUpload}
                    SlideshowImages={images}
                    handleChange={handleChange}/>                     */}
                    <br/>
                    <Divider/>
                    <Divider/>
                    <div className="headFont">Delete Photos from the Logos Folder</div>
                    <div align="center">
                    <AdminDashCard
                    URL={urlArray[0]}
                    nameOfService="Logos"
                    showValue={show[0]}
                    progressBar={progressBar}
                    id="logos"
                    handleChange={handleAddChange}
                    handleUpload={handleUpload}/>
                    </div>
                    <DeleteCard images = {LogoImages}
                    handleChange = {handleChange}/>
                    {/* <EditLogos
                    URL={urlArray[0]}
                    showValue={show[0]}
                    progressBar={progressBar}
                    handleAddChange={handleAddChange}
                    handleUpload={handleUpload}
                    LogoImages={LogoImages}
                    handleChange={handleChange}/>                     */}
                    <br/>
                    
                    </div>
                </div>
            </div>
        </div>
    </div>
    );

};
export default DeleteImage;