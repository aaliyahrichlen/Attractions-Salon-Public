import React, { Component } from "react";
import AppointmentApp from "./AppointmentApp.js";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import './Appointments.css';
import Footer from "../../components/Footer/Footer";

class App extends Component {
  render() {
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
