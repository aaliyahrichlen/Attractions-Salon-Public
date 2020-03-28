import React, { Component } from "react";
import AppointmentApp from "./AppointmentApp.js";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import './Appointments.css';

class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppointmentApp />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
