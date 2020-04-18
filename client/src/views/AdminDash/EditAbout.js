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
import SidebarNav from "../../components/DashSidebar/SidebarNav.js";
import createForm from "./formBoxes.js";
import CreateForm from './formBoxes.js';
import Card from 'react-bootstrap/Card';
import "./AdminDash.css"
const EditAbout = (props) => {
    const [about, setAbout] = useState("");
  
    const handleAboutUpload = (e) => { 
        e.preventDefault();
        var db = fire.database();
        var ref = db.ref("text/about");
        ref.set(about);
    };

    const handleAboutChange = e =>{
        var str = String(e.target.value);
        if(str.replace(/\s/g, '').length){
        setAbout(e.target.value);
        }
    };

    useEffect(() => {
        var db = fire.database();
        var ref = db.ref("text/about");
        ref.on("value", function(snapshot) {
                setAbout(snapshot.val());
        });
    },[]);

    return (
        <div >           
                {/* <div className="box"> */}
                    {/* <div className="admHead">About Page
                    </div> */}
                    {/* <div className="formBox"> */}
                    <form  onSubmit={handleAboutUpload} >
                            {/* <FormControl key={`${Math.floor((Math.random() * 1000))}-min`}>
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
                            </div>  */}

                            <Card className="aboutResize">
                                <Card.Body>
                                <Card.Title className="admHead">About</Card.Title>
                                <FormControl fullWidth="true" key={`${Math.floor((Math.random() * 1000))}-min`}>
                                    <InputLabel htmlFor="component-simple">About </InputLabel>
                                    <Input  id="component-simple" multiline="true" defaultValue={about} onBlur={handleAboutChange} />
                                </FormControl>
                                    <div className="buf">
                                        <Button
                                            variant="contained"
                                            color="default"
                                            size="large"
                                            startIcon={<SaveIcon />}
                                            className="buf"
                                            size="small"
                                            onClick = {handleAboutUpload}>
                                            Save
                                        </Button> 
                                    </div> 
                                </Card.Body>
                            </Card>                     
                    </form> 
                    {/* </div>
                    </div> */}
            </div>
    );
}
export default EditAbout;