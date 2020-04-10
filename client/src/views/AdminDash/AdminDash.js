import React, {useState, useEffect} from 'react';
import fire from "../Login/config/Fire";
import {storage} from "../Login/config/Fire";
import {db} from "../Login/config/Fire";
import { FormControl } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import "./AdminDash.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminDashCard from "../../components/Cards/AdminDashCard";
const AdminDash = (props) => {
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
    

    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            setFolder(e.target.id);
        }
    };

    const handleTextChange =index => e => {
        var str = String(e.target.value);
        if(str.replace(/\s/g, '').length)
       { let newArray = [...nameArray];
        newArray[index] = e.target.value;
        setNameArray(newArray);
       }

    };
    const handlePriceChange = index=> e => {
        var str = String(e.target.value);
        if(str.replace(/\s/g, '').length){
        let newArray = [...priceArray];
        newArray[index] = e.target.value;
        setPriceArray(newArray);
        }
    };
    const handleDescChange = index=> e => {
        var str = String(e.target.value);
        if(str.replace(/\s/g, '').length){
        let newArray = [...descArray];
        newArray[index] = e.target.value;
        setDescArray(newArray);
        }
    };
    const handleAboutChange = e =>{
        var str = String(e.target.value);
        if(str.replace(/\s/g, '').length){
        setAbout(e.target.value);
        }
    };
    useEffect(() => {
        var db = fire.database();
        var ref = db.ref("text/services");
        ref.on("value", function(userSnapshot) {
            setDescArray([]);
            setNameArray([]);
            setPriceArray([]);
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
const addService = e =>{
    setCardNumber(cardNumber+1);
    setNameArray(nameArray => nameArray.concat(""));
    setPriceArray(priceArray => priceArray.concat(""));
    setDescArray(descArray => descArray.concat(""));
};
const deleteService = index => e=>{
    e.preventDefault();
    nameArray.splice(index, 1);
    setNameArray([...nameArray]);
    
    priceArray.splice(index, 1);
    setPriceArray([...priceArray]);
    
    descArray.splice(index, 1);
    setDescArray([...descArray]);

    setCardNumber(cardNumber - 1);

    var db = fire.database();
    var ref = db.ref("text");
    var usersRef = ref.child("services");
    usersRef.remove();
    for (let i = 0; i < cardNumber-1; i++) 
    { 
        usersRef.push().set({
    
            name: nameArray[i],
            price: priceArray[i],
            description: descArray[i]
    });

    }

};


const createForm = () =>{
    let formBoxes = [];
    for (let i = 0; i < cardNumber; i++) 
    {
        var name;
        if(nameArray[i].replace(/\s/g, '').length){
            name = nameArray[i];
        }
        else
            name = "New service";

        formBoxes.push(   
                            
        <div className="formBox">
        <div className="admHead">{name}</div>
        <form   onSubmit={handleTextUpload} >
            
            <FormControl >
            <InputLabel className="buf" htmlFor="component-simple">Name: </InputLabel>
            <Input className="buf" id="component-simple" defaultValue={name} onBlur={handleTextChange(i)} label="Name" />
            </FormControl>
            <br />
            <FormControl >
            <InputLabel className="buf" htmlFor="component-simple">Price: </InputLabel>
            <Input className="buf" id="component-simple" defaultValue={priceArray[i]} onBlur={handlePriceChange(i)} />
            </FormControl>
            <br />
            <FormControl key={`${Math.floor((Math.random() * 1000))}-min`}>
            <InputLabel className="buf" htmlFor="component-simple">Description: </InputLabel>
            <Input className="buf" id="component-simple" multiline="true" defaultValue={descArray[i]} onBlur={handleDescChange(i)} />
            </FormControl>
            <br />
            <div className="buf">
                    <input type="file" onChange={handleChange}/>
                    </div>
                    <div className="buf">
                    <Button
                            variant="contained"
                            color="default"
                            size="large"
                            startIcon={<CloudUploadIcon />}
                            className="buf"
                            size="small"
                            onClick = {handleUpload} 
                        >
                            Upload
                        </Button> 
                        </div>
            <div className="serviceButton">
            
            <Button
        variant="contained"
        color="default"
        size="large"
        startIcon={<SaveIcon />}
        className="buf"
        size="small"
        onClick = {handleTextUpload} 
      >
        Save
      </Button>
     
        <Button
        variant="contained"
        color="default"
        className="buf"
        startIcon={<DeleteIcon />}
        onClick = {deleteService(i)}
        size="small"
      >
        Delete
      </Button>
      
      </div>
      </form> 
    </div>)
    }
    
    return formBoxes;
};
    const handleTextUpload = (e) => {
        e.preventDefault();
   

        var db = fire.database();
        var ref = db.ref("text");

        var usersRef = ref.child("services");
        usersRef.remove();
       
        for (let i = 0; i < cardNumber; i++) 
        { 
            usersRef.push().set({
        
                name: nameArray[i],
                price: priceArray[i],
                description: descArray[i]
            
        });

         }

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

    return (
        <div>
            <div className="header">
                <div className="headLeft">
                    <div className="adminHead">Admin Dashboard</div>
                </div>
                <div className="headRight">
                    
                <Button
                            variant="contained"
                            color="default"
                            size="large"
                            size="small"
                            onClick = {logout} 
                        >
                            Logout
                        </Button>
                        
                        <Button
                            variant="contained"
                            color="default"
                            size="large"
                            startIcon={<DeleteIcon />}
                            size="small"
                            onClick={event =>  window.location.href='/delete'}
                        >
                            Delete Images
                        </Button>
                        
                </div>
            </div>
            <div class="leftPage">
                {/* <div>
                    <AdminDashCard handleUpload = {handleUpload}
                    handleChange = {handleChange}
                    URL = {urlArray[0]}/>
                </div> */}
                <div class="box">
                    <div className="admHead">Upload an image for your logo!</div>
                    {/*logos*/}
                    <img class="ui fluid image" src={urlArray[0]}></img>
                    {/* <img src={urlArray[0]}/>  */}
                    {/* alt="logoImage" */}
                     { show[0] && <progress value={progressBar} max="100"/>}

                    <div className="buf">
                    <input id="logos" type="file" onChange={handleChange}/>
                    </div>
                    <div className="buf">
                    <Button
                            variant="contained"
                            id='1'
                            color="default"
                            size="large"
                            startIcon={<CloudUploadIcon />}
                            className="buf"
                            size="small"
                            onClick = {handleUpload} 
                        >
                            Upload
                        </Button> 
                        </div>
                        
                </div>
                <div class="box">
                    <div className="admHead">Upload images for your homepage slideshow!</div>
                    {/*slideshow*/}
                    <img class="ui fluid image" src={urlArray[1]}></img>
                    {/* <img src={urlArray[1]}/> */}
                     { show[1] && <progress value={progressBar} max="100"/> }

                    


                    <div className="buf">
                    <input id="slideshow" type="file" onChange={handleChange}/>
                    </div>
                    <div className="buf">
                    <Button
                            variant="contained"
                            color="default"
                            size="large"
                            startIcon={<CloudUploadIcon />}
                            className="buf"
                            size="small"
                            onClick = {handleUpload} 
                        >
                            Upload
                        </Button> 
                        </div>
                    
                </div>
                <div class="box">
                    <div className="admHead">Upload images for your services!</div>
                    {/*services*/}
                    <img class="ui fluid image" src={urlArray[2]}></img>
                    {/* <img src={urlArray[2]}/> */}
                     { show[2] && <progress value={progressBar} max="100"/>}
                
                     <div className="buf">
                    <input id="services" type="file" onChange={handleChange}/>
                    </div>
                    <div className="buf">
                    <Button
                            variant="contained"
                            color="default"
                            size="large"
                            startIcon={<CloudUploadIcon />}
                            className="buf"
                            size="small"
                            onClick = {handleUpload} 
                        >
                            Upload
                        </Button> 
                        </div>
                    
                </div>
                <div class="box">
                    <div className="admHead">Upload images for your about page!</div>
                    {/*About*/}
                    <img class="ui fluid image" src={urlArray[3]}></img>
                    {/* <img src={urlArray[3]}/> */}
                     { show[3] && <progress value={progressBar} max="100"/>}

                     <div className="buf">
                    <input id="about" type="file" onChange={handleChange}/>
                    </div>
                    <div className="buf">
                    <Button
                            variant="contained"
                            color="default"
                            size="large"
                            startIcon={<CloudUploadIcon />}
                            className="buf"
                            size="small"
                            onClick = {handleUpload} 
                        >
                            Upload
                        </Button> 
                        </div>
                </div>
                <div className="box">
                    <div className="admHead">About Page</div>
                    <div className="formBox">
                    <form  onSubmit={handleAboutUpload} >
                            <FormControl key={`${Math.floor((Math.random() * 1000))}-min`}>
                             <InputLabel className="buf" htmlFor="component-simple">About </InputLabel>
                            <Input className="buf" id="component-simple" multiline="true" defaultValue={about} onBlur={handleAboutChange} />
                             </FormControl>
                             <br/>
                             <div className="buf">
                             <Button
                            variant="contained"
                            color="default"
                            size="large"
                            startIcon={<SaveIcon />}
                            className="buf"
                            size="small"
                            onClick = {handleAboutUpload} 
                        >
                            Save
                        </Button> 
      </div>                      
                            </form> 
                            </div>
                    </div>
            </div>
            <div className="rightPage">
                <div className="adminHead">Edit service details!</div>
                <div className="formContainer">
                    {createForm()}
                    <Button
        variant="contained"
        color="default"
        className="buf"
        startIcon={<ControlPointIcon />}
        onClick = {addService}
        size="medium"
        
      >
          Add a Service!
      </Button>
                    
                </div>
            </div>
        </div>
    );
};
export default AdminDash;
