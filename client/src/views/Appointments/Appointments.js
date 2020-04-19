import React, { Component } from "react";
import AppointmentApp from "./AppointmentApp.js";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import './Appointments.css';
import Footer from "../../components/Footer/Footer";
import LoginHome from "../Login/App";
import * as firebase from 'firebase';

class App extends Component {
  render() {
    if (!firebase.auth().currentUser) {
      return <LoginHome/>
    }
    return (
      <div>
        <div className="pageBuf">
        <MuiThemeProvider>
          <AppointmentApp />
        </MuiThemeProvider>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
