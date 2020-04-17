// import React, { useState, useEffect, Component } from 'react';
// import fire from "../../views/Login/config/Fire";
// import {storage} from "../../views/Login/config/Fire";

// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import {Navbar, Nav, NavItem, Icon, Modal} from 'react-bootstrap';

// import Sidebar from 'react-bootstrap-sidebar';

import React from "react";
import {push as Menu } from "react-burger-menu";
import "./Sidebar.css";
import { Button } from 'semantic-ui-react'
import Dropdown from "./../Dropdown buttons/Dropdown.js";

const SidebarNav = (props) => {
  const changeToDel = e =>{
    window.location.href="/delete";
  }

  const changeToEditServices= e =>{
    window.location.href="/editServices";
  }

  return (
    <Menu {...props}>

      <Dropdown maintext= "Edit Images" function={changeToDel}
      listitem1= "Logos" listitem2="Slideshow" listitem3= "Reviews"/>

    <br></br>
      {/* <Dropdown maintext= "Edit Text" function={changeToEditServices}
      listitem1= "Category1" listitem2="Category2" listitem3= "Category3"/> */}
      <Button  compact color='white' onClick={changeToEditServices}>Edit Services</Button>
      <br/>
      <Button compact color='white'>Pizzas</Button>
     <br/>
      <Button compact color='white'>Pizzas</Button>
    </Menu>
  );
};

export default SidebarNav;

