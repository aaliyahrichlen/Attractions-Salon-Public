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
    const [name, setName] = useState('');
    const [nameArray, setNameArray] = useState([]);
    const [price, setPrice] = useState('');
    const [priceArray, setPriceArray] = useState([]);


    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            setFolder(e.target.id);
        }
    };

    const handleTextChange = e => {
        setName(e.target.value);

    };
    const handlePriceChange = e => {
        setPrice(e.target.value);
    };


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

    useEffect(() => {
        if(name === '')
    {}
    else
        setNameArray(nameArray => nameArray.concat(name));

    }, [name]); // I think this changes twice because first it gets set and then updated when I press the button

    useEffect(() => {
        if(price === '')
        {}
        else
            setPriceArray(priceArray => priceArray.concat(price));

    }, [price]); // I think this changes twice because first it gets set and then updated when I press the button

    

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
        if(nameArray.length < 7 || priceArray.length <7)
        {
            
        console.log(nameArray);
        
        console.log(priceArray);
            alert("Must fill all entries!");
            setNameArray([]);
            setPriceArray([]);

        }

        else{
        console.log(name);
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
    }
    setNameArray([]);
    setPriceArray([]);
    };

    const logout = () => {
        fire.auth().signOut();
    }

    return (
        <div>
            <div>
                <h1>Welcome to Home</h1>
                <button onClick={logout}>Logout</button>
            </div>
            <div class="leftPage">
                <div class="box">
                    <h2>Upload Image for Your Logo!</h2>
                    {/*logos*/}
                    <img src={url}/> {/* alt="logoImage" */}
                    <br/> {
                    show && <progress value={progressBar}
                        max="100"/>}
                }
                    <br/>
                    <input id="logos" type="file"
                        onChange={handleChange}/>
                    <br/>
                    <button id='1'
                        onClick={handleUpload}>Upload</button>
                </div>
                <div class="box">
                    <h2>Upload Images for Your Slideshow!</h2>
                    {/*slideshow*/}
                    <img src={url}/>
                    <br/> {
                    show && <progress value={progressBar}
                        max="100"/>}
                }
                    <br/>
                    <input id="slideshow" type="file"
                        onChange={handleChange}/>
                    <br/>
                    <button onClick={handleUpload}>Upload</button>
                </div>
                <div class="box">
                    <h2>Upload Images for Your Services!</h2>
                    {/*services*/}
                    <img src={url}/>
                    <br/> {
                    show && <progress value={progressBar}
                        max="100"/>}
                }
                    <br/>
                    <input id="services" type="file"
                        onChange={handleChange}/>
                    <br/>
                    <button onClick={handleUpload}>Upload</button>
                </div>
                <div class="box">
                    <h2>Upload Images for Your About page!</h2>
                    {/*About*/}
                    <img src={url}/>
                    <br/> {
                    show && <progress value={progressBar}
                        max="100"/>}
                }
                    <br/>
                    <input id="about" type="file"
                        onChange={handleChange}/>
                    <br/>
                    <button onClick={handleUpload}>Upload</button>
                </div>
            </div>
            <div className="rightPage">
                <Card style={
                    {width: '18rem'}
                }>
                    <Card.Img variant="top"
                        src={url}/>
                    <Card.Body>
                        <Card.Title></Card.Title>
                        <h2>Change text for your services!</h2>
                        <Popup trigger={
                                <Button
                            color='pink'
                            content='Change Names!'/>
                            }
                            content={
                                <form>
                            <label>
                            Name 1:
                            <input type="text"name="name1"onBlur={handleTextChange}/>
                            </label>

                            <label>
                            Name 2:
                            <input type="text"name="name2"onBlur={handleTextChange}/>
                            </label>
                            
                            <label>
                            Name 3:
                            <input type="text"name="name3"onBlur={handleTextChange}/>
                            </label>

                            <label>
                            Name 4:
                            <input type="text"name="name4"onBlur={handleTextChange}/>
                            </label>

                            <label>
                            Name 5:
                            <input type="text"name="name5"onBlur={handleTextChange}/>
                            </label>


                            <label>
                            Name 6:
                            <input type="text"name="name6"onBlur={handleTextChange}/>
                            </label>

                            <label>
                            Name 7:
                            <input type="text"name="name7"onBlur={handleTextChange}/>
                            </label>

                          
                            </form>
                            }
                            on='click'
                            position='top right'/>
                        <br/>
                        <br/>
                    </Card.Body>
                </Card>
                <Card style={
                    {width: '18rem'}
                }>
                    <Card.Img variant="top"
                        src={url}/>
                    <Card.Body>
                        <Card.Title></Card.Title>
                        <h2>Change text for your services!</h2>
                        <Popup trigger={
                                <Button
                            color='pink'
                            content='Change Prices!'/>
                            }
                            content={
                                <form>
                            <label>
                            Price 1:
                            <input type="text"name="price1"onBlur={handlePriceChange}/>
                            </label>

                            <label>
                            Price 2:
                            <input type="text"name="price2"onBlur={handlePriceChange}/>
                            </label>
                            
                            <label>
                            Price 3:
                            <input type="text"name="price3"onBlur={handlePriceChange}/>
                            </label>

                            <label>
                            Price 4:
                            <input type="text"name="price4"onBlur={handlePriceChange}/>
                            </label>

                            <label>
                            Price 5:
                            <input type="text"name="price5"onBlur={handlePriceChange}/>
                            </label>


                            <label>
                            Price 6:
                            <input type="text"name="price6"onBlur={handlePriceChange}/>
                            </label>

                            <label>
                            Price 7:
                            <input type="text"name="price7"onBlur={handlePriceChange}/>
                            </label>

                         
                            </form>
                            }
                            
                            on='click'
                            position='top right'/>
                        <br/>
                        <br/>
                      
                    </Card.Body>
                </Card>
                <button
                            onClick={handleTextUpload}>
                            Upload
                            </button>
            </div>
        </div>
    );
};
export default AdminDash;
