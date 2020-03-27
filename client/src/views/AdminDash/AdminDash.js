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

    var tempIndex =0;
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
    useEffect(() => {
        var db = fire.database();
        var ref = db.ref("text/services");
        ref.on("value", function(userSnapshot) {
            userSnapshot.forEach(function(snapshot) {
                setNameArray(nameArray => nameArray.concat(snapshot.child("name").val()));
                setPriceArray(priceArray => priceArray.concat(snapshot.child("price").val()));

            
            });
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
   
        console.log(nameArray);
        
        console.log(priceArray);

        var db = fire.database();
        var ref = db.ref("text");

        var usersRef = ref.child("services");
        usersRef.set({
            service1: {
                name: nameArray[0],
                price: priceArray[0]
            },
            service2: {
                name: nameArray[1],
                price: priceArray[1]
            },
            service3: {
                name: nameArray[2],
                price: priceArray[2]
            },
            service4: {
                name: nameArray[3],
                price: priceArray[3]
            },
            service5: {
                name: nameArray[4],
                price: priceArray[4]
            },
            service6: {
                name: nameArray[5],
                price: priceArray[5]
            },
            service7: {
                name: nameArray[6],
                price: priceArray[6]
            }
        });
    
    };

    const logout = () => {
        fire.auth().signOut();
    }

    return (
        <div>
            <div>
            <div className="adminHead">Admin Dashboard</div>
                <button className="adButton" onClick={logout}>Logout</button>
            </div>
            <div class="leftPage">
                <div class="box">
                    <div className="admHead">Upload Image for Your Logo!</div>
                    {/*logos*/}
                    <img src={url}/> {/* alt="logoImage" */}
                    <br/> {
                    show && <progress value={progressBar}
                        max="100"/>}
                
                    <br/>
                    <input className="adButton" id="logos" type="file"
                        onChange={handleChange}/>
                    <br/>
                    <button className="adButton" id='1'
                        onClick={handleUpload}>Upload</button>
                </div>
                <div class="box">
                    <div className="admHead">Upload Images for Your Slideshow!</div>
                    {/*slideshow*/}
                    <img src={url}/>
                    <br/> {
                    show && <progress value={progressBar}
                        max="100"/>}
                
                    <br/>
                    <input className="adButton" id="slideshow" type="file"
                        onChange={handleChange}/>
                    <br/>
                    <button className="adButton" onClick={handleUpload}>Upload</button>
                </div>
                <div class="box">
                    <div className="admHead">Upload Images for Your Services!</div>
                    {/*services*/}
                    <img src={url}/>
                    <br/> {
                    show && <progress value={progressBar}
                        max="100"/>}
                
                    <br/>
                    <input className="adButton" id="services" type="file"
                        onChange={handleChange}/>
                    <br/>
                    <button className="adButton" onClick={handleUpload}>Upload</button>
                </div>
                <div class="box">
                    <div className="admHead">Upload Images for Your About page!</div>
                    {/*About*/}
                    <img src={url}/>
                    <br/> {
                    show && <progress value={progressBar}
                        max="100"/>}
                
                    <br/>
                    <input className="adButton" id="about" type="file"
                        onChange={handleChange}/>
                    <br/>
                    <button className="adButton" onClick={handleUpload}>Upload</button>
                </div>
            </div>
            <div className="rightPage">
                <div className="adminHead">Edit service details!</div>
                <Card style={
                    {width: '18rem'}
                }>
                    <Card.Img variant="top"
                        src={url}/>
                    <Card.Body>
                        <Card.Title></Card.Title>
                        <div className="admHead">Service 1</div>
                        
                                <form onSubmit={handleTextUpload}>
                            <label>
                            Name 1:
                            <input type="text"name="name1"onBlur={handleTextChange(0)}/>
                            </label>
                            <label>
                            Price 1:
                            <input type="text"name="price1"onBlur={handlePriceChange(0)}/>
                            </label>
                            <input type="submit" value="Upload"></input>

                         
                            </form>
                      
                    </Card.Body>
                </Card>
                <Card style={
                    {width: '18rem'}
                }>
                    <Card.Img variant="top"
                        src={url}/>
                    <Card.Body>
                        <Card.Title></Card.Title>
                        <div className="admHead">Service 2</div>
                        
                                <form onSubmit={handleTextUpload}>
                            <label>
                            Name 2:
                            <input type="text"name="name2"onBlur={handleTextChange(1)}/>
                            </label>
                            <label>
                            Price 2:
                            <input type="text"name="price2"onBlur={handlePriceChange(1)}/>
                            </label>
                            <input type="submit" value="Upload"></input>

                         
                            </form>
                      
                    </Card.Body>
                </Card>
                <Card style={
                    {width: '18rem'}
                }>
                    <Card.Img variant="top"
                        src={url}/>
                    <Card.Body>
                        <Card.Title></Card.Title>
                        <div className="admHead">Service 3</div>
                        
                                <form onSubmit={handleTextUpload}>   
                            <label>
                            Name 3:
                            <input type="text"name="name3"onBlur={handleTextChange(2)}/>
                            </label>
                            <label>
                            Price 3:
                            <input type="text"name="price3"onBlur={handlePriceChange(2)}/>
                            </label>
                            <input type="submit" value="Upload"></input>

                         
                            </form>
                      
                    </Card.Body>
                </Card>
                <Card style={
                    {width: '18rem'}
                }>
                    <Card.Img variant="top"
                        src={url}/>
                    <Card.Body>
                        <Card.Title></Card.Title>
                        <div className="admHead">Service 4</div>
                        
                                <form onSubmit={handleTextUpload}>
                            <label>
                            Name 4:
                            <input type="text"name="name4"onBlur={handleTextChange(3)}/>
                            </label>
                            <label>
                            Price 4:
                            <input type="text"name="price4"onBlur={handlePriceChange(3)}/>
                            </label>
                            <input type="submit" value="Upload"></input>

                         
                            </form>
                      
                    </Card.Body>
                </Card>
                <Card style={
                    {width: '18rem'}
                }>
                    <Card.Img variant="top"
                        src={url}/>
                    <Card.Body>
                        <Card.Title></Card.Title>
                        <div className="admHead">Service 5</div>
                        
                                <form onSubmit={handleTextUpload}>
                            <label>
                            Name 5:
                            <input type="text"name="name5"onBlur={handleTextChange(4)}/>
                            </label>
                            <label>
                            Price 5:
                            <input type="text"name="price5"onBlur={handlePriceChange(4)}/>
                            </label>
                            <input type="submit" value="Upload"></input>

                         
                            </form>
                      
                    </Card.Body>
                </Card>
                <Card style={
                    {width: '18rem'}
                }>
                    <Card.Img variant="top"
                        src={url}/>
                    <Card.Body>
                        <Card.Title></Card.Title>
                        <div className="admHead">Service 6</div>
                        
                                <form onSubmit={handleTextUpload}>

                            <label>
                            Name 6:
                            <input type="text"name="name6"onBlur={handleTextChange(5)}/>
                            </label>
                            <label>
                            Price 6:
                            <input type="text"name="price6"onBlur={handlePriceChange(5)}/>
                            </label>
                            <input type="submit" value="Upload"></input>

                         
                            </form>
                      
                    </Card.Body>
                </Card>
                <Card style={
                    {width: '18rem'}
                }>
                    <Card.Img variant="top"
                        src={url}/>
                    <Card.Body>
                        <Card.Title></Card.Title>
                        <div className="admHead">Service 7</div>
                        
                                <form onSubmit={handleTextUpload}>
                            <label>
                            Name 7:
                            <input type="text"name="name7"onBlur={handleTextChange(6)}/>
                            </label>
                            <label>
                            Price 7:
                            <input type="text"name="price7"onBlur={handlePriceChange(6)}/>
                            </label>
                            <input type="submit" value="Upload"></input>

                         
                            </form>
                      
                    </Card.Body>
                </Card>
                
            </div>
        </div>
    );
};
export default AdminDash;
