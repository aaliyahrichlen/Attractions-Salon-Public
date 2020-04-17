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
import "./AdminDash.css";

const CreateForm = (props) =>{
    let formBoxes = [];
    for (let i = 0; i < props.cardNumber; i++) 
    {
        var name;
        if(props.nameArray[i].replace(/\s/g, '').length){
            name = props.nameArray[i];
        }
        else
            name = "New service";

        formBoxes.push(   
                            
        <div className="formBox">
        <div className="admHead">{name}</div>
        <form   onSubmit={props.handleTextUpload} >
            
            <FormControl >
            <InputLabel className="buf" htmlFor="component-simple">Name </InputLabel>
            <Input className="buf" id="component-simple" defaultValue={name} onBlur={props.handleTextChange(i)} label="Name" />
            </FormControl>
            <br />
            <FormControl key={`${Math.floor((Math.random() * 1000))}-min`}>
            <InputLabel className="buf" htmlFor="component-simple">Price </InputLabel>
            <Input className="buf" id="component-simple" defaultValue={props.priceArray[i]} onBlur={props.handlePriceChange(i)} label="Price" />
            </FormControl>
            <br />
            <FormControl >
            <InputLabel className="buf" htmlFor="component-simple">Description </InputLabel>
            <Input className="buf" id="component-simple" multiline="true" defaultValue={props.descArray[i]} onBlur={props.handleDescChange(i)} />
            </FormControl>
            <br />
            <div className="buf">
                    <input type="file" onChange={props.handleChange}/>
                    </div>
                    <div className="buf">
                    <Button
                            variant="contained"
                            color="default"
                            size="large"
                            startIcon={<CloudUploadIcon />}
                            className="buf"
                            size="small"
                            onClick = {props.handleUpload} 
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
        onClick = {props.handleTextUpload} 
      >
        Save
      </Button>
     
        <Button
        variant="contained"
        color="default"
        className="buf"
        startIcon={<DeleteIcon />}
        onClick = {props.deleteService(i)}
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
export default CreateForm;