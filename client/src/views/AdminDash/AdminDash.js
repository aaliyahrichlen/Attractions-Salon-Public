import React, {useState, useEffect} from 'react';
import {Button, Popup} from 'semantic-ui-react';
import fire from "../Login/config/Fire";
import {storage} from "../Login/config/Fire";
import "./AdminDash.css";
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
const AdminDash = () => {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);
    const [progressBar, setProgressBar] = useState(0);
    const [show, setShow] = useState(false);
    const [folder, setFolder] = useState(null);
    const [imagesURL, setImagesURL] = useState([]);
    const [imageNames, setImageNames] = useState([]);
    const [picturesArray, setPicturesArray] = useState([]);
    const [nameArray, setNameArray] = useState([]);
    const [priceArray, setPriceArray] = useState([]);
    const [descArray, setDescArray] = useState([]);
    const [about, setAbout] = useState("");

    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            setFolder(e.target.id);
        }
    };

    const handleTextChange =index => e => {
        
        let newArray = [...nameArray];
        newArray[index] = e.target.value;
        setNameArray(newArray);

    };
    const handlePriceChange = index=> e => {
        let newArray = [...priceArray];
        newArray[index] = e.target.value;
        setPriceArray(newArray);
    };
    const handleDescChange = index=> e => {
        let newArray = [...descArray];
        newArray[index] = e.target.value;
        setDescArray(newArray);
    };
    const handleAboutChange = e =>{

        setAbout(e.target.value);

    };
    useEffect(() => {
        var db = fire.database();
        var ref = db.ref("text/services");
        ref.on("value", function(userSnapshot) {
            userSnapshot.forEach(function(snapshot) {
                setNameArray(nameArray => nameArray.concat(snapshot.child("name").val()));
                setPriceArray(priceArray => priceArray.concat(snapshot.child("price").val()));
                setDescArray(descArray => descArray.concat(snapshot.child("description").val()));
            });
        });
    },[]);
    useEffect(() => {
        var db = fire.database();
        var ref = db.ref("text/about");
        ref.on("value", function(snapshot) {
                setAbout(snapshot.val());
        });
    },[]);
      

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
        setShow(true);
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
                // writing to database prob: Duplicate entries!
                // var fireRef = fire.database().ref("images");
                // fireRef.push().set({
                //     name: image.name,
                //     URL: url
                // })
            })
        });
    };

    const handleTextUpload = (e) => {
        e.preventDefault();
   

        var db = fire.database();
        var ref = db.ref("text");

        var usersRef = ref.child("services");
        usersRef.set({
            service1: {
                name: nameArray[0],
                price: priceArray[0],
                description: descArray[0]
            },
            service2: {
                name: nameArray[1],
                price: priceArray[1],
                description: descArray[1]
            },
            service3: {
                name: nameArray[2],
                price: priceArray[2],
                description: descArray[2]
            },
            service4: {
                name: nameArray[3],
                price: priceArray[3],
                description: descArray[3]
            },
            service5: {
                name: nameArray[4],
                price: priceArray[4],
                description: descArray[4]

            },
            service6: {
                name: nameArray[5],
                price: priceArray[5],
                description: descArray[5]
            },
            service7: {
                name: nameArray[6],
                price: priceArray[6],
                description: descArray[6]
            }
        });
        var aboutRef = ref.child("about");
        aboutRef.set(about);
    
    };

    const logout = () => {
        fire.auth().signOut();
    }

    return (
        <div>
            <div className="header">
                <div className="headLeft">
                    <div className="adminHead">Admin Dashboard</div>
                </div>
                <div className="headRight">
                    <button className="adButton" onClick={logout}>Logout</button>
                </div>
            </div>
            <div class="leftPage">
                <div class="box">
                    <div className="admHead">Upload an image for your logo!</div>
                    {/*logos*/}
                    <img src={url}/> 
                    {/* alt="logoImage" */}
                     {
                    show && <progress value={progressBar}
                        max="100"/>}
                
                    
                    <input className="adButton" id="logos" type="file"
                        onChange={handleChange}/>
                    <br/>
                    <button className="adButton" id='1'
                        onClick={handleUpload}>Upload</button>
                </div>
                <div class="box">
                    <div className="admHead">Upload images for your homepage slideshow!</div>
                    {/*slideshow*/}
                    <img src={url}/>
                     {
                    show && <progress value={progressBar}
                        max="100"/>}
                
                    
                    <input className="adButton" id="slideshow" type="file"
                        onChange={handleChange}/>
                    <br/>
                    <button className="adButton" onClick={handleUpload}>Upload</button>
                </div>
                <div class="box">
                    <div className="admHead">Upload images for your services!</div>
                    {/*services*/}
                    <img src={url}/>
                     {
                    show && <progress value={progressBar}
                        max="100"/>}
                
                    
                    <input className="adButton" id="services" type="file"
                        onChange={handleChange}/>
                    <br/>
                    <button className="adButton" onClick={handleUpload}>Upload</button>
                </div>
                <div class="box">
                    <div className="admHead">Upload images for your about page!</div>
                    {/*About*/}
                    <img src={url}/>
                     {
                    show && <progress value={progressBar}
                        max="100"/>}
                
                    
                    <input className="adButton" id="about" type="file"
                        onChange={handleChange}/>
                    <br/>
                    <button className="adButton" onClick={handleUpload}>Upload</button>
                </div>
            </div>
            <div className="rightPage">
                <div className="adminHead">Edit service details!</div>
                <div className="formContainer">
                        <div className="formBox">
                            <div className="admHead">Service 1</div>
                            <form  onSubmit={handleTextUpload}>
                                <label className="buf">
                                Name:<br/>
                                <input className="buf" type="text"name="name1"onBlur={handleTextChange(0)}/>
                                </label> <br/>
                                <label className="buf">
                                Price:<br/>
                                <input className="buf" type="text"name="price1"onBlur={handlePriceChange(0)}/>
                                </label><br/>
                                <label className="buf">
                                Description:<br/>
                                <input className="buf" type="text"name="desc1"onBlur={handleDescChange(0)}/>
                                </label><br/>
                                <input className="buf" type="submit" value="Save"></input>                         
                            </form> 
                        </div>
                        <div className="formBox">
                            <div className="admHead">Service 2</div>
                            <form  onSubmit={handleTextUpload}>
                                <label className="buf">
                                Name:<br/>
                                <input className="buf" type="text"name="name2"onBlur={handleTextChange(1)}/>
                                </label> <br/>
                                <label className="buf">
                                Price:<br/>
                                <input className="buf" type="text"name="price2"onBlur={handlePriceChange(1)}/>
                                </label><br/>
                                <label className="buf">
                                Description:<br/>
                                <input className="buf" type="text"name="desc2"onBlur={handleDescChange(1)}/>
                                </label><br/>
                                <input className="buf" type="submit" value="Save"></input>                         
                            </form> 
                        </div>
                        <div className="formBox">
                            <div className="admHead">Service 3</div>
                            <form  onSubmit={handleTextUpload}>
                                <label className="buf">
                                Name:<br/>
                                <input className="buf" type="text"name="name3"onBlur={handleTextChange(2)}/>
                                </label> <br/>
                                <label className="buf">
                                Price:<br/>
                                <input className="buf" type="text"name="price3"onBlur={handlePriceChange(2)}/>
                                </label><br/>
                                <label className="buf">
                                Description:<br/>
                                <input className="buf" type="text"name="desc3"onBlur={handleDescChange(2)}/>
                                </label><br/>
                                <input className="buf" type="submit" value="Save"></input>                         
                            </form> 
                        </div>
                        <div className="formBox">
                            <div className="admHead">Service 4</div>
                            <form  onSubmit={handleTextUpload}>
                                <label className="buf">
                                Name:<br/>
                                <input className="buf" type="text"name="name4"onBlur={handleTextChange(3)}/>
                                </label> <br/>
                                <label className="buf">
                                Price:<br/>
                                <input className="buf" type="text"name="price4"onBlur={handlePriceChange(3)}/>
                                </label><br/>
                                <label className="buf">
                                Description:<br/>
                                <input className="buf" type="text"name="desc4"onBlur={handleDescChange(3)}/>
                                </label><br/>
                                <input className="buf" type="submit" value="Save"></input>                         
                            </form> 
                        </div>
                        <div className="formBox">
                            <div className="admHead">Service 5</div>
                            <form  onSubmit={handleTextUpload}>
                                <label className="buf">
                                Name:<br/>
                                <input className="buf" type="text"name="name5"onBlur={handleTextChange(4)}/>
                                </label> <br/>
                                <label className="buf">
                                Price:<br/>
                                <input className="buf" type="text"name="price5"onBlur={handlePriceChange(4)}/>
                                </label><br/>
                                <label className="buf">
                                Description:<br/>
                                <input className="buf" type="text"name="desc5"onBlur={handleDescChange(4)}/>
                                </label><br/>
                                <input className="buf" type="submit" value="Save"></input>                         
                            </form> 
                        </div>
                        <div className="formBox">
                            <div className="admHead">Service 6</div>
                            <form  onSubmit={handleTextUpload}>
                                <label className="buf">
                                Name:<br/>
                                <input className="buf" type="text"name="name6"onBlur={handleTextChange(5)}/>
                                </label> <br/>
                                <label className="buf">
                                Price:<br/>
                                <input className="buf" type="text"name="price6"onBlur={handlePriceChange(5)}/>
                                </label><br/>
                                <label className="buf">
                                Description:<br/>
                                <input className="buf" type="text"name="desc6"onBlur={handleDescChange(5)}/>
                                </label><br/>
                                <input className="buf" type="submit" value="Save"></input>                         
                            </form> 
                        </div>
                        <div className="formBox">
                            <div className="admHead">Service 7</div>
                            <form  onSubmit={handleTextUpload}>
                                <label className="buf">
                                Name:<br/>
                                <input className="buf" type="text"name="name7"onBlur={handleTextChange(6)}/>
                                </label> <br/>
                                <label className="buf">
                                Price:<br/>
                                <input className="buf" type="text"name="price7"onBlur={handlePriceChange(6)}/>
                                </label><br/>
                                <label className="buf">
                                Description:<br/>
                                <input className="buf" type="text"name="desc7"onBlur={handleDescChange(6)}/>
                                </label><br/>
                                <input className="buf" type="submit" value="Save"></input>                         
                            </form> 
                        </div>
                        <div className="formBox">
                            <div className="admHead">About</div>
                            <form  onSubmit={handleTextUpload}>
                                <label className="buf">
                                Text:<br/>
                                <input className="buf" type="text"name="name8"onBlur={handleAboutChange}/>
                                </label> <br/>
                                <input className="buf" type="submit" value="Save"></input>                         
                            </form> 
                        </div>
                </div>
            </div>
        </div>
    );
};
export default AdminDash;
