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
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import "./AdminDash.css";

const CreateForm = (props) =>{
  const categories = [
    {
      value: 'Full Set',
      label: 'Full Set',
    },
    {
      value: 'Pedicure',
      label: 'Pedicure',
    },
    {
      value: 'Manicure',
      label: 'Manicure',
    },
    {
      value: 'Fill',
      label: 'Fill',
    },
    
    {
        value: 'Polish',
        label: 'Polish',
      },
      {
        value: 'Hair',
        label: 'Hair',
      }
  ];
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
            
            <FormControl fullWidth="true">
            <InputLabel className="buf" htmlFor="component-simple">Name </InputLabel>
            <Input className="buf" id="component-simple" defaultValue={name} onBlur={props.handleTextChange(i)} label="Name" />
            </FormControl>
            <br />
            <FormControl fullWidth="true" key={`${Math.floor((Math.random() * 1000))}-min`}>
            <InputLabel className="buf" htmlFor="component-simple">Price </InputLabel>
            <Input className="buf" id="component-simple" defaultValue={props.priceArray[i]} onBlur={props.handlePriceChange(i)} label="Price" />
            </FormControl>
            <br />
            <FormControl fullWidth="true" >
            <InputLabel className="buf" htmlFor="component-simple">Description </InputLabel>
            <Input className="buf" id="component-simple" multiline="true" defaultValue={props.descArray[i]} onBlur={props.handleDescChange(i)} />
            </FormControl>
            <br />
            <TextField
          id="Category"
          select
          label="Category"
          value={props.category[i]}
          onChange={props.handleCategoryChange(i)}
          key={`${Math.floor((Math.random() * 1000))}-min`}
        >
          {categories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br/>
            <div>
              <div className="buf">
                    <input  type="file" onChange={props.handleChange}/>
                    
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
