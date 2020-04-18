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
import Footer from '../../components/Footer/Footer';
import SidebarNav from "../../components/DashSidebar/SidebarNav.js";
import createForm from "./formBoxes.js";
import CreateForm from './formBoxes.js';
import EditAbout from "./EditAbout.js";
import DeletePage from "../DeleteImage/DeleteImage";
import Divider from '@material-ui/core/Divider';

const EditServices = (props) => {
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
    const [category, setCategory] = useState([]);



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
    const handleCategoryChange =index => (e) => {
        e.preventDefault();
        let newArray = [...category];
        newArray[index] = e.target.value;
        setCategory(newArray);
      };
    // const handleAboutChange = e =>{
    //     var str = String(e.target.value);
    //     if(str.replace(/\s/g, '').length){
    //     setAbout(e.target.value);
    //     }
    // };
    useEffect(() => {
        var db = fire.database();
        var ref = db.ref("text/services");
        ref.on("value", function(userSnapshot) {
            setDescArray([]);
            setNameArray([]);
            setPriceArray([]);
            setCategory([]);

            userSnapshot.forEach(function(snapshot) {
                setNameArray(nameArray => nameArray.concat(snapshot.child("name").val()));
                setPriceArray(priceArray => priceArray.concat(snapshot.child("price").val()));
                setDescArray(descArray => descArray.concat(snapshot.child("description").val()));
                setCategory(category => category.concat(snapshot.child("category").val()));


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
    setCategory(category => category.concat(""));

};
const deleteService = index => e=>{
    e.preventDefault();
    nameArray.splice(index, 1);
    setNameArray([...nameArray]);
    
    priceArray.splice(index, 1);
    setPriceArray([...priceArray]);
    
    descArray.splice(index, 1);
    setDescArray([...descArray]);

    
    category.splice(index, 1);
    setDescArray([...category]);

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
            description: descArray[i],
            category: category[i]

    });

    }

};

// const createForm = () =>{
//     let formBoxes = [];
//     for (let i = 0; i < cardNumber; i++) 
//     {
//         var name;
//         if(nameArray[i].replace(/\s/g, '').length){
//             name = nameArray[i];
//         }
//         else
//             name = "New service";

//         formBoxes.push(   
                            
//         <div className="formBox">
//         <div className="admHead">{name}</div>
//         <form   onSubmit={handleTextUpload} >
            
//             <FormControl >
//             <InputLabel className="buf" htmlFor="component-simple">Name </InputLabel>
//             <Input className="buf" id="component-simple" defaultValue={name} onBlur={handleTextChange(i)} label="Name" />
//             </FormControl>
//             <br />
//             <FormControl key={`${Math.floor((Math.random() * 1000))}-min`}>
//             <InputLabel className="buf" htmlFor="component-simple">Price </InputLabel>
//             <Input className="buf" id="component-simple" defaultValue={priceArray[i]} onBlur={handlePriceChange(i)} label="Price" />
//             </FormControl>
//             <br />
//             <FormControl >
//             <InputLabel className="buf" htmlFor="component-simple">Description </InputLabel>
//             <Input className="buf" id="component-simple" multiline="true" defaultValue={descArray[i]} onBlur={handleDescChange(i)} />
//             </FormControl>
//             <br />
//             <div className="buf">
//                     <input type="file" onChange={handleChange}/>
//                     </div>
//                     <div className="buf">
//                     <Button
//                             variant="contained"
//                             color="default"
//                             size="large"
//                             startIcon={<CloudUploadIcon />}
//                             className="buf"
//                             size="small"
//                             onClick = {handleUpload} 
//                         >
//                             Upload
//                         </Button> 
//                         </div>
//             <div className="serviceButton">
            
//             <Button
//         variant="contained"
//         color="default"
//         size="large"
//         startIcon={<SaveIcon />}
//         className="buf"
//         size="small"
//         onClick = {handleTextUpload} 
//       >
//         Save
//       </Button>
     
//         <Button
//         variant="contained"
//         color="default"
//         className="buf"
//         startIcon={<DeleteIcon />}
//         onClick = {deleteService(i)}
//         size="small"
//       >
//         Delete
//       </Button>
      
//       </div>
//       </form> 
//     </div>)
//     }
    
//     return formBoxes;
// };
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
                description: descArray[i],
                category: category[i]
        });

         }

    };
    // const handleAboutUpload = (e) => { 
    //     e.preventDefault();
    //     var db = fire.database();
    //     var ref = db.ref("text/about");
    //     ref.set(about);
    // };


    const logout = () => {
        fire.auth().signOut();
    }

    return (
        <div className="adminContainer">
        
        <div id="App">
        <div id="page-wrap">
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
                        
                </div>
            </div>
           
            <div className="fullpage">
                <div className="adminHead">Edit the Services Page</div>
                <div className="formContainer">
                    <CreateForm
                    cardNumber={cardNumber}
                    nameArray={nameArray}
                    handleTextChange={handleTextChange}
                    handleTextUpload={handleTextUpload}
                    priceArray={priceArray}
                    handlePriceChange={handlePriceChange}
                    descArray={descArray}
                    handleCategoryChange={handleCategoryChange}
                    category={category}
                    handleDescChange={handleDescChange}
                    handleChange={handleChange}
                    handleUpload={handleUpload}
                    deleteService={deleteService}
                    />
                    {/* {createForm()} */}
                    </div>
                    <div className="buf">
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
                <br/>
                <Divider/>
                <Divider/>
                <DeletePage/>
                
            </div>
        </div>
        
        </div>

     </div>
    );
};
export default EditServices;
