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
    const [name, setName] = useState(null);


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
        console.log(e.target.value);
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

    const handleNameUpload = (e) => {
        e.preventDefault();
        var db = fire.database();
        var ref = db.ref("text");

        var usersRef = ref.child("services");
        usersRef.set({
            service1: {
                name: name,
                price: "Alan Turing"
            },
            service2: {
                name: "December 9, 1906",
                price: "Grace Hopper"
            }
        });

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
                            Name 1:<inputtype="text"name="name"onChange={handleTextChange}/>
                            </label><buttononClick={handleNameUpload}>
                            Upload</button></form>
                            }
                            on='click'
                            position='top right'/>
                        <br/>
                        <br/>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};
export default AdminDash;
