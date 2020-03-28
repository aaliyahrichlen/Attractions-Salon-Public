import React, { Component } from "react";
import AppointmentApp from "./AppointmentApp.js";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import './Appointments.css';
import {SquarePaymentForm} from "react";
import PaymentPage from '../Payments/PaymentPage.js';

class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppointmentApp />
        </MuiThemeProvider>
        <PaymentPage />
      </div>
    );
  }
}

export default App;
